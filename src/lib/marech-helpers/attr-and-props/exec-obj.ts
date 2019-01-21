import attrToObj from './attr-to-obj';
import regExp from '../../padroes/reg-exp';
import resolveFunction from '../../functions/resolve-function';

// Execute @... calls
const execObj:Function = (text:string, propes:string, prepropes:{indent: (string|number)}) => {
  let finalTeleg = text;
  let props = propes;

  let flags:{ [propName: string]: string; } = {};
  const finalFlags = {
    indent: prepropes.indent || 0,
  };

  // Line break?
  if (props[0] !== ' ') {
    props = ` ${props}`;
  }

  // Analyse all @... attr
  const marechExp = regExp.flags;
  let mtch:any;
  while ((mtch = marechExp.exec(props))) {
    // Split each @foo=... @bar=... to ["foo='...'", "bar='...'"]
    let matches = mtch[0].split(/(\n|[ ])@/g);
    if (matches) {
      // Remove null itens
      matches = matches.filter((i:string) => i.trim());
      // Convert '=' to ':'
      matches = matches.map((i:string) => i.replace(/=(?='|")/, ':'));
    }

    // Convert to JS Object
    flags = attrToObj(matches);

    if (flags.indent && finalFlags.indent !== '\t') {
      finalFlags.indent = flags.indent + finalFlags.indent;
    }
  }

  //
  // IDENTATION
  // Set default tab
  let tabs = '\t';
  if (finalFlags.indent !== '\t') {
    // Set the new "tab"
    tabs = '';
    // es5 don't have String.repeat method
    for (let i = 0; i < finalFlags.indent; i += 1) {
      tabs += ' ';
    }
  }
  // Indent
  finalTeleg = finalTeleg.replace(/(?:\n|^)/g, `\n${tabs}`);
  finalTeleg = tabs + finalTeleg;
  // END IDENTATION
  //

  // Find marech definition
  let marechDefinition = '';

  const findMarechDefinition = finalTeleg.match(regExp.marechDef);
  if (findMarechDefinition) {
    marechDefinition = findMarechDefinition[0];
  }

  // Resolve JS(...) inside marech tag
  const rjs = marechDefinition.match(/JS\(([^](?!(>)))*\)/g);
  if (rjs) {
    rjs.forEach((e) => {
      marechDefinition = marechDefinition.replace(e, resolveFunction(e));
    });
  }

  // User's can define default attr if aren't defined
  const findTelegArgs = marechDefinition.match(regExp.marechDefOnlyArgs);

  let defaultTelegArgs = '';
  if (findTelegArgs) {
    defaultTelegArgs = attrToObj(findTelegArgs[0]);
  }

  // Remove @ flags
  const args = attrToObj(props.replace(regExp.flags, ''));

  // Remove marech definition from final teleg
  finalTeleg = finalTeleg.replace(marechDefinition, '').trim();

  // Return data
  return {
    args,
    defaultTelegArgs,
    flags,
    marechTeleg: finalTeleg,
  };
};

export default execObj;
