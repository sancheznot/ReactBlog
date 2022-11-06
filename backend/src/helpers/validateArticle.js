const validator = require("validator");
const helpers = {};

helpers.validArt = (title, content) => {
  let validTitle =
    !validator.isEmpty(title) && validator.isLength(title, { min: 5, max: 35 });
  let validContent = !validator.isEmpty(content);

  if (!validTitle || !validContent) {
    throw new Error("We cannot validate the info");
  }
};

module.exports = helpers;