// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createContext = function createContext() {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas not implemented");
  return {
    canvas: canvas,
    ctx: ctx
  };
};

exports.createContext = createContext;
},{}],"src/read-image.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var helpers_1 = require("./helpers");

var loadImage = function loadImage(url) {
  return new Promise(function (res, rej) {
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = url;

    image.onload = function () {
      res(image);
    };

    image.onerror = rej;
  });
};

var readImage = function readImage(url) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, ctx, canvas, img, data;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _a = helpers_1.createContext(), ctx = _a.ctx, canvas = _a.canvas;
          return [4
          /*yield*/
          , loadImage(url)];

        case 1:
          img = _b.sent();
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          data = ctx.getImageData(0, 0, img.width, img.height).data;
          return [2
          /*return*/
          , {
            data: data,
            width: img.width,
            height: img.height
          }];
      }
    });
  });
};

exports.readImage = readImage;

var writeImage = function writeImage(_a, arr, width, height) {
  var ctx = _a.ctx,
      canvas = _a.canvas;
  canvas.width = width;
  canvas.height = height;
  var imgData = new ImageData(arr, width, height);
  ctx.putImageData(imgData, 0, 0);
};

exports.writeImage = writeImage;

var writeImageFromBitMatrix = function writeImageFromBitMatrix(context, matrix, width, height) {
  var arr = new Uint8ClampedArray(width * height * 4);

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var i = (x + y * width) * 4;
      var val = +matrix.get(x, y) * 255;
      arr[i] = val;
      arr[i + 1] = val;
      arr[i + 2] = val;
      arr[i + 3] = 255;
    }
  }

  writeImage(context, arr, width, height);
};

exports.writeImageFromBitMatrix = writeImageFromBitMatrix;
},{"./helpers":"src/helpers.ts"}],"assets/crossword.jpg":[function(require,module,exports) {
module.exports = "/crossword.8fdb6d9e.jpg";
},{}],"src/detect-edges.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var generateMatrix = function generateMatrix(w, h, initialValue) {
  var matrix = [];

  for (var x = 0; x < w; x++) {
    matrix[x] = [];

    for (var y = 0; y < h; y++) {
      matrix[x][y] = initialValue;
    }
  }

  return matrix;
};

var GrayImageData =
/** @class */
function () {
  function GrayImageData(width, height) {
    this.width = width;
    this.height = height;
    this.data = generateMatrix(width, height, 0);
  }

  GrayImageData.prototype.loadCanvas = function (canvas) {
    var ctx = canvas.getContext("2d");

    var _a = ctx.getImageData(0, 0, canvas.width, canvas.height),
        data = _a.data,
        width = _a.width,
        height = _a.height;

    this.data = generateMatrix(width, height, 0);
    this.width = width;
    this.height = height;

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var i = (y * width + x) * 4;
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        this.data[x][y] = Math.round(0.298 * r + 0.586 * g + 0.114 * b);
      }
    }
  };

  GrayImageData.prototype.getNeighbours = function (x, y, size) {
    var neighbours = [];

    for (var i = 0; i < size; i++) {
      neighbours[i] = [];

      for (var j = 0; j < size; j++) {
        var trnsX = x - (size - 1) / 2 + i;
        var trnsY = y - (size - 1) / 2 + j;

        if (this.data[trnsX] && this.data[trnsX][trnsY]) {
          neighbours[i][j] = this.data[trnsX][trnsY];
        } else {
          neighbours[i][j] = 0;
        }
      }
    }

    return neighbours;
  };

  GrayImageData.prototype.eachPixel = function (neighbourSize, fn) {
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        var current = this.data[x][y];
        var neighbours = this.getNeighbours(x, y, neighbourSize);
        fn(x, y, current, neighbours);
      }
    }
  };

  GrayImageData.prototype.toImageDataArray = function () {
    var _a = this,
        width = _a.width,
        height = _a.height,
        data = _a.data;

    var arr = new Uint8ClampedArray(width * height * 4);

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var i = (y * width + x) * 4;
        var n = data[x][y];
        arr[i] = n;
        arr[i + 1] = n;
        arr[i + 2] = n;
        arr[i + 3] = 255;
      }
    }

    return arr;
  };

  GrayImageData.prototype.copy = function () {
    var _a = this,
        width = _a.width,
        height = _a.height,
        data = _a.data;

    var copied = new GrayImageData(width, height);

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        copied.data[x][y] = data[x][y];
      }
    }

    copied.width = width;
    copied.height = height;
    return copied;
  };

  GrayImageData.prototype.drawOn = function (canvas) {
    var ctx = canvas.getContext("2d");
    var imgData = new ImageData(this.toImageDataArray(), canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);
  };

  GrayImageData.prototype.fill = function (color) {
    var _a = this,
        width = _a.width,
        height = _a.height,
        data = _a.data;

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        data[x][y] = color;
      }
    }
  };

  return GrayImageData;
}();

var gaussianBlur = function gaussianBlur(imgData, sigma, size) {
  if (sigma === void 0) {
    sigma = 1.4;
  }

  if (size === void 0) {
    size = 3;
  }

  var kernel = generateKernel(sigma, size);
  var copy = imgData.copy();
  copy.fill(0);
  imgData.eachPixel(size, function (x, y, _, neighbours) {
    var i = 0;

    while (i <= size - 1) {
      var j = 0;

      while (j <= size - 1) {
        copy.data[x][y] += neighbours[i][j] * kernel[i][j];
        j++;
      }

      i++;
    }
  });
  return copy;
};

var generateKernel = function generateKernel(sigma, size) {
  var s = sigma;
  var e = 2.718;
  var kernel = generateMatrix(size, size, 0);
  var sum = 0;

  for (var i = 0; i < size; i++) {
    var x = -(size - 1) / 2 + i;

    for (var j = 0; j < size; j++) {
      var y = -(size - 1) / 2 + j;
      var gaussian = 1 / (2 * Math.PI * s * s) * Math.pow(e, -(x * x + y * y) / (2 * s * s));
      kernel[i][j] = gaussian;
      sum += gaussian;
    }
  } // normalization


  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      kernel[i][j] = +(kernel[i][j] / sum).toFixed(3);
    }
  }

  console.log("kernel", kernel);
  return kernel;
};

var sobel = function sobel(imgData) {
  var yFiler = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
  var xFiler = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
  var copy = imgData.copy();
  copy.fill(0);
  imgData.eachPixel(3, function (x, y, current, neighbours) {
    var ghs = 0;
    var gvs = 0;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        ghs += yFiler[i][j] * neighbours[i][j];
        gvs += xFiler[i][j] * neighbours[i][j];
      }
    }

    copy.data[x][y] = Math.sqrt(ghs * ghs + gvs * gvs);
  });
  return copy;
};

var nonMaximumSuppression = function nonMaximumSuppression(imgData) {
  var copy = imgData.copy();
  copy.fill(0); // discard non-local maximum

  imgData.eachPixel(3, function (x, y, c, n) {
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

var hysteresis = function hysteresis(imgData, ht, lt) {
  var copy = imgData.copy();

  var isStrong = function isStrong(edge) {
    return edge > ht;
  };

  var isCandidate = function isCandidate(edge) {
    return edge <= ht && edge >= lt;
  };

  var isWeak = function isWeak(edge) {
    return edge < lt;
  }; // discard weak edges, pick up strong ones


  imgData.eachPixel(3, function (x, y, current) {
    if (isStrong(current)) copy.data[x][y] = 255;else if (isWeak(current) || isCandidate(current)) copy.data[x][y] = 0;
  }); // traverse over candidate edges connected to strong ones

  var traverseEdge = function traverseEdge(x, y) {
    if (x === 0 || y === 0 || x === imgData.width - 1 || y === imgData.height - 1) {
      return;
    }

    if (isStrong(copy.data[x][y])) {
      var neighbours = copy.getNeighbours(x, y, 3);

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (isCandidate(neighbours[i][j])) {
            copy.data[x - 1 + i][y - 1 + j] = 255;
            traverseEdge(x - 1 + i, y - 1 + j);
          }
        }
      }
    }
  };

  copy.eachPixel(3, traverseEdge); // discard others

  copy.eachPixel(1, function (x, y, current) {
    if (!isStrong(current)) {
      copy.data[x][y] = 0;
    }
  });
  return copy;
};

var detectEdges = function detectEdges(canvas, ht, lt, sigma, kernelSize) {
  if (ht === void 0) {
    ht = 200;
  }

  if (lt === void 0) {
    lt = 150;
  }

  if (sigma === void 0) {
    sigma = 1.4;
  }

  if (kernelSize === void 0) {
    kernelSize = 3;
  }

  var imgData = new GrayImageData(canvas.width, canvas.height);
  imgData.loadCanvas(canvas);
  return hysteresis(nonMaximumSuppression(sobel(gaussianBlur(imgData, sigma, kernelSize))), ht, lt);
};

exports.detectEdges = detectEdges;
},{}],"src/detect-lines.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NUM_ANGLE_CELLS = 360; // Precalculate tables.

var COS_TABLE = new Array(NUM_ANGLE_CELLS);
var SIN_TABLE = new Array(NUM_ANGLE_CELLS);

for (var theta = 0, thetaIndex = 0; thetaIndex < NUM_ANGLE_CELLS; theta += Math.PI / NUM_ANGLE_CELLS, thetaIndex++) {
  COS_TABLE[thetaIndex] = Math.cos(theta);
  SIN_TABLE[thetaIndex] = Math.sin(theta);
}

var detectLines = function detectLines(canvas) {
  var width = canvas.width,
      height = canvas.height;
  var ctx = canvas.getContext("2d");
  var data = ctx.getImageData(0, 0, width, height).data;
  var rhoMax = Math.ceil(Math.sqrt(width * width + height * height));
  var accum = new Int32Array(rhoMax * NUM_ANGLE_CELLS * 6); // should downsample rather than skip pixels!

  for (var x = 0; x < width; x += 2) {
    for (var y = 0; y < height; y += 2) {
      var isOn = !!data[(y * width + x) * 4];

      if (isOn) {
        accumulate(accum, rhoMax, x, y);
      }
    }
  }

  return {
    data: accum,
    width: NUM_ANGLE_CELLS,
    height: rhoMax
  };
};

exports.detectLines = detectLines;

var accumulate = function accumulate(accum, rhoMax, x, y) {
  for (var thetaIndex = 0; thetaIndex < NUM_ANGLE_CELLS; thetaIndex++) {
    var rho = rhoMax + x * COS_TABLE[thetaIndex] + y * SIN_TABLE[thetaIndex];
    rho >>= 1;
    var i = (rho * NUM_ANGLE_CELLS + thetaIndex) * 6;
    var ax = accum[i];
    var ay = accum[i + 1];
    var bx = accum[i + 2];
    var by = accum[i + 3];
    var dist = accum[i + 4];
    var count = accum[i + 5];
    var axd = ax - x;
    var ayd = ay - y;
    var add = axd * axd + ayd * ayd; // don't need to sqrt

    if (!count) {
      accum[i] = x;
      accum[i + 1] = y;
      accum[i + 2] = x;
      accum[i + 3] = y; // accum[i + 4] = 0;

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
      var bxd = bx - x;
      var byd = by - y;
      var bdd = bxd * bxd + byd * byd; // don't need to sqrt

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
  } // normalize before threshold


  return accum;
};

var threshold = function threshold(accum) {
  for (var i = 0; i < accum.length; i += 6) {
    if (accum[i + 5] < 110) {
      accum[i + 5] = 0;
    }
  }

  return accum;
};

var drawLines = function drawLines(canvas, accum, width, height) {
  threshold(accum);
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "red";

  for (var thetaIndex = 0; thetaIndex < width; thetaIndex++) {
    for (var rho = 0; rho < height; rho++) {
      var i = (rho * NUM_ANGLE_CELLS + thetaIndex) * 6;
      var count = accum[i + 5];
      if (!count) continue;
      var ax = accum[i];
      var ay = accum[i + 1];
      var bx = accum[i + 2];
      var by = accum[i + 3];
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
  }
};

exports.drawLines = drawLines;

var toData = function toData(accum, width, height) {
  var data = new Uint8ClampedArray(width * height * 4);

  for (var i = 0; i < accum.length / 6; i++) {
    var count = accum[i * 6 + 5];
    var di = i * 4;
    data[di] = 0;
    data[di + 1] = 0;
    data[di + 2] = 0;
    data[di + 3] = count;
  }

  return data;
};

exports.toData = toData;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var read_image_1 = require("./read-image");

var crossword_jpg_1 = __importDefault(require("../assets/crossword.jpg"));

var helpers_1 = require("./helpers");

var detect_edges_1 = require("./detect-edges");

var detect_lines_1 = require("./detect-lines");

var image = helpers_1.createContext();
var edge = helpers_1.createContext();
var line = helpers_1.createContext();

var appendCanvas = function appendCanvas(canvas) {
  canvas.style.height = "auto";
  canvas.style.maxWidth = "600px";
  canvas.style.display = "inline-block";
  document.body.appendChild(canvas);
};

(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var imgData, lineData;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , read_image_1.readImage(crossword_jpg_1.default)];

        case 1:
          imgData = _a.sent();
          read_image_1.writeImage(edge, imgData.data, imgData.width, imgData.height);
          detect_edges_1.detectEdges(edge.canvas).drawOn(edge.canvas);
          lineData = detect_lines_1.detectLines(edge.canvas);
          read_image_1.writeImage(line, detect_lines_1.toData(lineData.data, lineData.width, lineData.height), lineData.width, lineData.height); // const matrix = binarize(data, width, height);
          // writeImageFromBitMatrix(image, matrix, width, height);

          read_image_1.writeImage(image, imgData.data, imgData.width, imgData.height);
          detect_lines_1.drawLines(image.canvas, lineData.data, lineData.width, lineData.height); // line.canvas.width = image.canvas.width;
          // line.canvas.height = image.canvas.height;
          // locate(matrix, width, height, line.ctx);

          appendCanvas(image.canvas);
          appendCanvas(line.canvas);
          appendCanvas(edge.canvas);
          return [2
          /*return*/
          ];
      }
    });
  });
})();
},{"./read-image":"src/read-image.ts","../assets/crossword.jpg":"assets/crossword.jpg","./helpers":"src/helpers.ts","./detect-edges":"src/detect-edges.ts","./detect-lines":"src/detect-lines.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63234" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map