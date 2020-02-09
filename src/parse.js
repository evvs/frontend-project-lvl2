const fs = require('fs');

export const jsonToObject = (way) => JSON.parse(fs.readFileSync(way));