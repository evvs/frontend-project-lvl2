import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (extname) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  const parser = parsers[extname];
  return parser;
};

export default getParser;
