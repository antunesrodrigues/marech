interface RegExpInterface {
  [propName: string]: RegExp;
}

const regExp:RegExpInterface = {
  marechTag: /<Marech@(([^](?!<))*)(\/>|><\/Marech>)/gi,
  marechTagAttr: /(?<=<Marech@).*(?=(\/>|><\/Marech>))/i,

  marechDef: /<Marech(([^](?!<))*)(\/>|><\/Marech>)/gi,
  marechDefOnlyArgs: /(?<=<Marech)[^]*(?=(\/>|><\/Marech>))/gi,

  attr: /(?:^|[ ])([a-z]+)=("|')/gi,
  flags: /(?:^|[ ]) @.+=("|').*\1/g,

};

export default regExp;
