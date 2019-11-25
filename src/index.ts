import { readImage, writeImageFromBitMatrix, writeImage } from "./read-image";
import crossword from "../assets/crossword.jpg";
import backpage from "../assets/back-page.jpg";
import dog from "../assets/dog.jpg";
import diagonal from "../assets/diagonal-hatch.jpg";
import { binarize } from "./binarize";
import { createContext } from "./helpers";
import { downsample } from "./downsample";
import { locate } from "./locate";
import { detectEdges } from "./detect-edges";
import { detectLines, toData, drawLines } from "./detect-lines";

const image = createContext();
const edge = createContext();
const line = createContext();

const appendCanvas = (canvas: HTMLCanvasElement) => {
  canvas.style.height = "auto";
  canvas.style.maxWidth = "600px";
  canvas.style.display = "inline-block";
  document.body.appendChild(canvas);
};

(async () => {
  const imgData = await readImage(crossword);
  writeImage(edge, imgData.data, imgData.width, imgData.height);
  detectEdges(edge.canvas).drawOn(edge.canvas);
  // const { data, width, height } = downsample(
  //   imgData.data,
  //   imgData.width,
  //   imgData.height
  // );
  const lineData = detectLines(edge.canvas);
  writeImage(
    line,
    toData(lineData.data, lineData.width, lineData.height),
    lineData.width,
    lineData.height
  );
  // const matrix = binarize(data, width, height);
  // writeImageFromBitMatrix(image, matrix, width, height);
  writeImage(image, imgData.data, imgData.width, imgData.height);
  drawLines(image.canvas, lineData.data, lineData.width, lineData.height);
  // line.canvas.width = image.canvas.width;
  // line.canvas.height = image.canvas.height;
  // locate(matrix, width, height, line.ctx);
  appendCanvas(image.canvas);
  appendCanvas(line.canvas);
  appendCanvas(edge.canvas);
})();
