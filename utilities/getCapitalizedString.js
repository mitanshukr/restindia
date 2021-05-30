module.exports = (string) => {
  const stringArr = string.split(" ");
  return stringArr
    .map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    })
    .join(" ");
};
