const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ini = require('ini');

const readFile = (file) => fs.readFileSync(file, 'utf-8');

const fileFormats = [{
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

const findFileParser = (file) => {
  const { parser } = fileFormats.find(({ extname }) => extname === path.extname(file));
  return parser;
};

const parseFile = (file) => {
  const fileData = readFile(file);
  const dataParser = findFileParser(file);

  return dataParser(fileData);
};

export { parseFile, readFile };
