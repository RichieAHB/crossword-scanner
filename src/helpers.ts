const createContext = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas not implemented");
  return { canvas, ctx };
};

export { createContext };
