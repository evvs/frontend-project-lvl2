import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = [{
  extension: '.json',
  parser: JSON.parse,
},
{
  extension: '.yml',
  parser: yaml.safeLoad,
},
{
  extension: '.ini',
  parser: ini.parse,
},
];

const getParser = (pathToFile) => {
  const { parser } = parsers.find(({ extension }) => extension === path.extname(pathToFile));
  return parser;
};

export default (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const parseContent = getParser(pathToFile);
  return parseContent(fileContent);
};
