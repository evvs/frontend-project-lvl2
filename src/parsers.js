import yaml from 'js-yaml';
import ini from 'ini';

const parse = (dataType, data) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return parsers[dataType](data);
};

export default parse;
