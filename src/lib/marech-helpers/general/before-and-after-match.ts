interface MatchFunctionsInterface {
  [propName: string]: Function;
}

// Get before and after text by match
const matchFunctions:MatchFunctionsInterface = {
  before(text:string, match:any) {
    return text.slice(0, match.index);
  },

  after(text:string, match:any) {
    return text.slice(match.index + match[0].length);
  },
};

export default matchFunctions;
