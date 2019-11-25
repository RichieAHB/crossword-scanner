import { createContext } from "./helpers";
import { BitMatrix } from "./BitMatrix";

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = url;
    image.onload = () => {
      res(image);
    };
    image.onerror = rej;
  });

const readImage = async (url: string) => {
  const { ctx, canvas } = createContext();
  const img = await loadImage(url);
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, img.width, img.height);
  return {
    data,
    width: img.width,
    height: img.height
  };
};

const writeImage = (
  { ctx, canvas }: { ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement },
  arr: Uint8ClampedArray,
  width: number,
  height: number
) => {
  canvas.width = width;
  canvas.height = height;
  const imgData = new ImageData(arr, width, height);
  ctx.putImageData(imgData, 0, 0);
};

const writeImageFromBitMatrix = (
  context: { ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement },
  matrix: BitMatrix,
  width: number,
  height: number
) => {
  const arr = new Uint8ClampedArray(width * height * 4);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = (x + y * width) * 4;
      const val = +matrix.get(x, y) * 255;
      arr[i] = val;
      arr[i + 1] = val;
      arr[i + 2] = val;
      arr[i + 3] = 255;
    }
  }

  writeImage(context, arr, width, height);
};

export { writeImageFromBitMatrix, readImage, writeImage };
