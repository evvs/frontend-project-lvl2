import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getContentParser = (pathToContent) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  const parser = parsers[path.extname(pathToContent)];
  return parser;
};

export default (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const parseContent = getContentParser(pathToFile);
  return parseContent(fileContent);
};
