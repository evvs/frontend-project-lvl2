const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ini = require('ini');

const parsers = [{
  extname: '.json',
  parser: JSON.parse,
},
{
  extname: '.yml',
  parser: yaml.safeLoad,
},
{
  extname: '.ini',
  parser: ini.parse,
},
];

const getParser = (pathToFile) => {
  const { parser } = parsers.find(({ extname }) => extname === path.extname(pathToFile));
  return parser;
};

export default (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const parseContent = getParser(pathToFile);
  return parseContent(fileContent);
};
