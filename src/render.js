export default (differences) => {
  const strDifferences = differences.reduce((accumulator, difference) => {
    switch (difference.actionName) {
      case 'added':
        return [...accumulator, `+ ${difference.key}: ${difference.newValue}`];
      case 'deleted':
        return [...accumulator, `- ${difference.key}: ${difference.oldValue}`];
      case 'changed':
        return [...accumulator, `+ ${difference.key}: ${difference.newValue}
- ${difference.key}: ${difference.oldValue}`];
      case 'unchanged':
        return [...accumulator, `  ${difference.key}: ${difference.oldValue}`];
      default:
        return false;
    }
  }, [])
    .join('\n');

  console.log(`\n{\n${strDifferences}\n}`);
  return strDifferences;
};
