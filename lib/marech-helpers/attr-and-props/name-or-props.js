// Get name or args by <Marech@...>
const nameOrProps = (mode, text) => {
  // Name (+ properties)
  const nameAndProps = text.match(/(?:<Marech@)(.*)(?=>)/i)[1];
  // Name
  const name = nameAndProps.split(' ')[0];
  // Props
  const props = nameAndProps.slice(name.length + 1).trim();

  if (mode == 'name') {
    return name;
  }
  else if (mode == 'props') {
    return props;
  }
  else {
    return '';
  }
};

module.exports = nameOrProps;