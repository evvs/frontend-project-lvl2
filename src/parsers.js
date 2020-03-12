const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ini = require('ini');

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

const getFileParser = (file) => {
  const { parser } = fileFormats.find(({ extname }) => extname === path.extname(file));
  return parser;
};

const parseFileToObj = (file) => getFileParser(file)(fs.readFileSync(file, 'utf-8'));


export default parseFileToObj;
