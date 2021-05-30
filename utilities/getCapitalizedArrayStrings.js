const getCapitalizedString = require("./getCapitalizedString");

module.exports = (array) => {
  return array.map((string) => {
    return getCapitalizedString(string);
  });
};
