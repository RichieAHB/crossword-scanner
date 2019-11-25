const NUM_ANGLE_CELLS = 360;
// Precalculate tables.
const COS_TABLE = new Array(NUM_ANGLE_CELLS);
const SIN_TABLE = new Array(NUM_ANGLE_CELLS);
for (
  let theta = 0, thetaIndex = 0;
  thetaIndex < NUM_ANGLE_CELLS;
  theta += Math.PI / NUM_ANGLE_CELLS, thetaIndex++
) {
  COS_TABLE[thetaIndex] = Math.cos(theta);
  SIN_TABLE[thetaIndex] = Math.sin(theta);
}

const detectLines = (canvas: HTMLCanvasElement) => {
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");
  const { data } = ctx!.getImageData(0, 0, width, height);
  const rhoMax = Math.ceil(Math.sqrt(width * width + height * height));
  const accum = new Int32Array(rhoMax * NUM_ANGLE_CELLS * 6);
  // should downsample rather than skip pixels!
  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < height; y += 2) {
      const isOn = !!data[(y * width + x) * 4];
      if (isOn) {
        accumulate(accum, rhoMax, x, y);
      }
    }
  }
  return { data: accum, width: NUM_ANGLE_CELLS, height: rhoMax };
};

const accumulate = (
  accum: Int32Array,
  rhoMax: number,
  x: number,
  y: number
) => {
  for (let thetaIndex = 0; thetaIndex < NUM_ANGLE_CELLS; thetaIndex++) {
    let rho = rhoMax + x * COS_TABLE[thetaIndex] + y * SIN_TABLE[thetaIndex];
    rho >>= 1;
    const i = (rho * NUM_ANGLE_CELLS + thetaIndex) * 6;

    let ax = accum[i];
    let ay = accum[i + 1];
    let bx = accum[i + 2];
    let by = accum[i + 3];
    let dist = accum[i + 4];
    let count = accum[i + 5];
    const axd = ax - x;
    const ayd = ay - y;
    const add = axd * axd + ayd * ayd; // don't need to sqrt

    if (!count) {
      accum[i] = x;
      accum[i + 1] = y;
      accum[i + 2] = x;
      accum[i + 3] = y;
      // accum[i + 4] = 0;
      accum[i + 5]++;
      continue;
    }

    if (add > dist) {
      dist = add;
      ax = ax;
      ay = ay;
      bx = x;
      by = y;
    }

    if (count > 1) {
      const bxd = bx - x;
      const byd = by - y;
      const bdd = bxd * bxd + byd * byd; // don't need to sqrt
      if (bdd > dist) {
        dist = bdd;
        ax = x;
        ay = y;
        bx = bx;
        by = by;
      }
    }

    accum[i] = ax;
    accum[i + 1] = ay;
    accum[i + 2] = bx;
    accum[i + 3] = by;
    accum[i + 4] = dist;
    accum[i + 5]++;
  }
  // normalize before threshold
  return accum;
};

const threshold = (accum: Int32Array) => {
  for (let i = 0; i < accum.length; i += 6) {
    if (accum[i + 5] < 110) {
      accum[i + 5] = 0;
    }
  }
  return accum;
};

const drawLines = (
  canvas: HTMLCanvasElement,
  accum: Int32Array,
  width: number,
  height: number
) => {
  threshold(accum);
  const ctx = canvas.getContext("2d");
  ctx!.strokeStyle = "red";
  for (let thetaIndex = 0; thetaIndex < width; thetaIndex++) {
    for (let rho = 0; rho < height; rho++) {
      const i = (rho * NUM_ANGLE_CELLS + thetaIndex) * 6;
      const count = accum[i + 5];
      if (!count) continue;
      const ax = accum[i];
      const ay = accum[i + 1];
      const bx = accum[i + 2];
      const by = accum[i + 3];
      ctx!.moveTo(ax, ay);
      ctx!.lineTo(bx, by);
      ctx!.stroke();
    }
  }
};

const toData = (accum: Int32Array, width: number, height: number) => {
  const data = new Uint8ClampedArray(width * height * 4);

  for (let i = 0; i < accum.length / 6; i++) {
    const count = accum[i * 6 + 5];
    const di = i * 4;
    data[di] = 0;
    data[di + 1] = 0;
    data[di + 2] = 0;
    data[di + 3] = count;
  }

  return data;
};

export { detectLines, toData, drawLines };
