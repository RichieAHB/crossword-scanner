const downsample = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  factor = 2
) => {
  const nw = Math.floor(w / factor);
  const nh = Math.floor(h / factor);
  const out = new Uint8ClampedArray(nw * nh * 4);

  for (let x = 0; x < nw; x++) {
    for (let y = 0; y < nh; y++) {
      const oi = (y * factor * w + x * factor) * 4;
      const ni = (y * nw + x) * 4;
      out[ni] = data[oi];
      out[ni + 1] = data[oi + 1];
      out[ni + 2] = data[oi + 2];
      out[ni + 3] = data[oi + 3];
    }
  }

  return {
    data: out,
    width: nw,
    height: nh
  };
};

export { downsample };
