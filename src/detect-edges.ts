const generateMatrix = (w: number, h: number, initialValue: number) => {
  const matrix = [] as number[][];
  for (let x = 0; x < w; x++) {
    matrix[x] = [];
    for (let y = 0; y < h; y++) {
      matrix[x][y] = initialValue;
    }
  }
  return matrix;
};

class GrayImageData {
  public data: number[][];

  constructor(public width: number, public height: number) {
    this.data = generateMatrix(width, height, 0);
  }

  loadCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    const { data, width, height } = ctx!.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    this.data = generateMatrix(width, height, 0);
    this.width = width;
    this.height = height;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        this.data[x][y] = Math.round(0.298 * r + 0.586 * g + 0.114 * b);
      }
    }
  }

  getNeighbours(x: number, y: number, size: number) {
    const neighbours = [] as number[][];
    for (let i = 0; i < size; i++) {
      neighbours[i] = [];
      for (let j = 0; j < size; j++) {
        const trnsX = x - (size - 1) / 2 + i;
        const trnsY = y - (size - 1) / 2 + j;
        if (this.data[trnsX] && this.data[trnsX][trnsY]) {
          neighbours[i][j] = this.data[trnsX][trnsY];
        } else {
          neighbours[i][j] = 0;
        }
      }
    }
    return neighbours;
  }

  eachPixel(
    neighbourSize: number,
    fn: (x: number, y: number, current: number, neighbours: number[][]) => void
  ) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const current = this.data[x][y];
        const neighbours = this.getNeighbours(x, y, neighbourSize);
        fn(x, y, current, neighbours);
      }
    }
  }

  toImageDataArray() {
    const { width, height, data } = this;
    const arr = new Uint8ClampedArray(width * height * 4);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (y * width + x) * 4;
        const n = data[x][y];
        arr[i] = n;
        arr[i + 1] = n;
        arr[i + 2] = n;
        arr[i + 3] = 255;
      }
    }
    return arr;
  }

  copy() {
    const { width, height, data } = this;
    const copied = new GrayImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        copied.data[x][y] = data[x][y];
      }
    }
    copied.width = width;
    copied.height = height;
    return copied;
  }

  drawOn(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    const imgData = new ImageData(
      this.toImageDataArray(),
      canvas.width,
      canvas.height
    );
    ctx!.putImageData(imgData, 0, 0);
  }

  fill(color: number) {
    const { width, height, data } = this;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        data[x][y] = color;
      }
    }
  }
}

const gaussianBlur = (imgData: GrayImageData, sigma = 1.4, size = 3) => {
  const kernel = generateKernel(sigma, size);
  const copy = imgData.copy();
  copy.fill(0);
  imgData.eachPixel(size, (x, y, _, neighbours) => {
    let i = 0;
    while (i <= size - 1) {
      let j = 0;
      while (j <= size - 1) {
        copy.data[x][y] += neighbours[i][j] * kernel[i][j];
        j++;
      }
      i++;
    }
  });
  return copy;
};

const generateKernel = (sigma: number, size: number) => {
  const s = sigma;
  const e = 2.718;
  const kernel = generateMatrix(size, size, 0);
  let sum = 0;
  for (let i = 0; i < size; i++) {
    const x = -(size - 1) / 2 + i;
    for (let j = 0; j < size; j++) {
      const y = -(size - 1) / 2 + j;
      const gaussian =
        (1 / (2 * Math.PI * s * s)) *
        Math.pow(e, -(x * x + y * y) / (2 * s * s));
      kernel[i][j] = gaussian;
      sum += gaussian;
    }
  }
  // normalization
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      kernel[i][j] = +(kernel[i][j] / sum).toFixed(3);
    }
  }
  console.log("kernel", kernel);
  return kernel;
};

const sobel = (imgData: GrayImageData) => {
  const yFiler = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ];
  const xFiler = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
  ];
  const copy = imgData.copy();
  copy.fill(0);
  imgData.eachPixel(3, (x, y, current, neighbours) => {
    let ghs = 0;
    let gvs = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        ghs += yFiler[i][j] * neighbours[i][j];
        gvs += xFiler[i][j] * neighbours[i][j];
      }
    }
    copy.data[x][y] = Math.sqrt(ghs * ghs + gvs * gvs);
  });
  return copy;
};

const nonMaximumSuppression = (imgData: GrayImageData) => {
  const copy = imgData.copy();
  copy.fill(0);
  // discard non-local maximum
  imgData.eachPixel(3, (x, y, c, n) => {
    if (n[1][1] > n[0][1] && n[1][1] > n[2][1]) {
      copy.data[x][y] = n[1][1];
    } else {
      copy.data[x][y] = 0;
    }
    if (n[1][1] > n[0][2] && n[1][1] > n[2][0]) {
      copy.data[x][y] = n[1][1];
    } else {
      copy.data[x][y] = 0;
    }
    if (n[1][1] > n[1][0] && n[1][1] > n[1][2]) {
      copy.data[x][y] = n[1][1];
    } else {
      copy.data[x][y] = 0;
    }
    if (n[1][1] > n[0][0] && n[1][1] > n[2][2]) {
      copy.data[x][y] = n[1][1];
    } else {
      copy.data[x][y] = 0;
    }
  });
  return copy;
};

const hysteresis = (imgData: GrayImageData, ht: number, lt: number) => {
  const copy = imgData.copy();
  const isStrong = (edge: number) => edge > ht;
  const isCandidate = (edge: number) => edge <= ht && edge >= lt;
  const isWeak = (edge: number) => edge < lt;
  // discard weak edges, pick up strong ones
  imgData.eachPixel(3, (x, y, current) => {
    if (isStrong(current)) copy.data[x][y] = 255;
    else if (isWeak(current) || isCandidate(current)) copy.data[x][y] = 0;
  });
  // traverse over candidate edges connected to strong ones
  const traverseEdge = (x: number, y: number) => {
    if (
      x === 0 ||
      y === 0 ||
      x === imgData.width - 1 ||
      y === imgData.height - 1
    ) {
      return;
    }
    if (isStrong(copy.data[x][y])) {
      const neighbours = copy.getNeighbours(x, y, 3);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (isCandidate(neighbours[i][j])) {
            copy.data[x - 1 + i][y - 1 + j] = 255;
            traverseEdge(x - 1 + i, y - 1 + j);
          }
        }
      }
    }
  };
  copy.eachPixel(3, traverseEdge);
  // discard others
  copy.eachPixel(1, (x, y, current) => {
    if (!isStrong(current)) {
      copy.data[x][y] = 0;
    }
  });
  return copy;
};

const detectEdges = (
  canvas: HTMLCanvasElement,
  ht = 200,
  lt = 150,
  sigma = 1.4,
  kernelSize = 3
) => {
  const imgData = new GrayImageData(canvas.width, canvas.height);
  imgData.loadCanvas(canvas);
  return hysteresis(
    nonMaximumSuppression(sobel(gaussianBlur(imgData, sigma, kernelSize))),
    ht,
    lt
  );
};

export { detectEdges };
