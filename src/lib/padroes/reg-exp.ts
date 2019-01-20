interface RegExpInterface {
  [propName: string]: RegExp;
}

const regExp:RegExpInterface = {
  marechTag: /<Marech@(([^](?!<))*)>/gi,
  marechTagAttr: /(?:<Marech@)(.*)(?=>)/i,

  marechDef: /<Marech(([^](?!<))*)>/gi,

  attr: /(?:^|[ ])([a-z]+)=("|')/gi,
  flags: /(?:^|[ ]) @.+=("|').*\1/g,

};

export default regExp;
