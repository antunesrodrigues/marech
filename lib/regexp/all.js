const regExp = {
  marechTag: /<Marech@(([^](?!<))*)>/gi,
  marechTagAttr: /(?:<Marech@)(.*)(?=>)/i,

  marechDef: /<Marech(([^](?!<))*)>/gi,

  
  attr: /(?:^|[ ])([a-z]+)=("|')/gi,
  flags: /(?:^|[ ]) @.+=("|').*\1/g,

};
module.exports = regExp;