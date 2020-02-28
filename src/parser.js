const fs = require('fs');
const path = require('path');

const fileFormats = [{
  extname: '.json',
  parser: JSON.parse,
},
{
  extname: '.yaml',
  parser: '',
},
{
  extname: '.ini',
  parser: '',
},
];

const getFileParser = (file) => {
  const { parser } = fileFormats.find(({ extname }) => extname === path.extname(file));
  return parser;
};

const parseFileToObj = (file) => getFileParser(file)(fs.readFileSync(file));

const createNode = (actionName, key, oldValue = null, newValue = null) => {
  const node = {
    actionName,
    key,
    oldValue,
    newValue,
  };

  return node;
};

export { parseFileToObj, createNode };