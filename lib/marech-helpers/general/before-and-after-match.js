// Get before and after text by match
const matchFunctions = {
  before(text, match) {
    return text.slice(0, match.index);
  },

  after(text, match) {
    return text.slice(match.index + match[0].length);
  }
};

module.exports = matchFunctions;