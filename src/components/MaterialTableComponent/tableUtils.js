export const getRowBackgroundColor = (rowData) => {
  switch (rowData) {
    case "в дорозі":
      return "#b4f9ad";
    case "завантаження":
      return "#b3dcfd";
    case "закритий":
      return "#d0d2d1";
    default:
      return "#f9ccad";
  }
};
