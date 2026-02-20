export const formatTemp = (temp,unit = "C") => {
  if (temp == null) return "-";
  return unit === "C"
    ? `${temp.toFixed(1)}°`
    : `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
};
