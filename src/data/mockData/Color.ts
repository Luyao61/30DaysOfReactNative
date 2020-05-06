const DEFAULT_COLOR_PALETTE = [
  "#F55D3E",
  "#878E88",
  "#F7CB15",
  "#FFFFFF",
  "#76BED0",
  "#1A535C",
  "#4ECDC4",
  "#F7FFF7",
  "#FF6B6B",
];

export function colorPalette(): string {
  const index = Math.floor(Math.random() * DEFAULT_COLOR_PALETTE.length);
  return DEFAULT_COLOR_PALETTE[index];
}

export function getContrastColor(hexcolor: string): string {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}
