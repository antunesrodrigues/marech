import regExp from '../../padroes/reg-exp';

// Get name or args by <Marech@...>
const nameOrProps:Function = (mode:string, text:string) => {
  const tag = text.match(regExp.marechTagAttr);
  // Name (+ properties)
  const nameAndProps = tag ? tag[0] : '';
  // Name
  const name = nameAndProps.split(' ')[0];
  // Props
  const props = nameAndProps.slice(name.length + 1).trim();

  if (mode === 'name') {
    return name;
  }
  if (mode === 'props') {
    return props;
  }

  return '';
};

export default nameOrProps;
