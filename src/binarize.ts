import { BitMatrix } from "./BitMatrix";

const sum = (arr: number[]) => arr.reduce((a, b) => a + b);
const average = (arr: number[]) => sum(arr) / arr.length;

const binarize = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  kernelSize = 3
) => {
  const matrix = BitMatrix.create(w, h);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let kernel = [];
      let px = -1;
      for (let xx = x - kernelSize; xx <= x + kernelSize; xx++) {
        for (let yy = y - kernelSize; yy <= y + kernelSize; yy++) {
          if (xx < 0 || xx > w || yy < 0 || yy > h) continue;
          const i = (yy * w + xx) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const gs = 0.2126 * r + 0.7152 * g + 0.0722 * b;

          if (xx === x && yy === y) {
            px = gs;
          }

          kernel.push(gs);
        }
      }
      const avg = average(kernel);
      const upx = px + (px - avg);
      matrix.set(x, y, upx > 128);
    }
  }
  return matrix;
};

export { binarize };
