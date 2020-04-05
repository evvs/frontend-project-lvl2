# frontend-project-lvl2
[![Maintainability](https://api.codeclimate.com/v1/badges/72882b90b08047b9f08f/maintainability)](https://codeclimate.com/github/evvs/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/72882b90b08047b9f08f/test_coverage)](https://codeclimate.com/github/evvs/frontend-project-lvl2/test_coverage)
![CI](https://github.com/evvs/frontend-project-lvl2/workflows/CI/badge.svg)

Compare two files and generate difference

Supported file formats: *json, ini, yml*

### install:
> npm install frontend-project-lvl2-evvs
[![asciicast](https://asciinema.org/a/JoiZ0gKOK5toE2oxiuj3nTmY7.svg)](https://asciinema.org/a/JoiZ0gKOK5toE2oxiuj3nTmY7)

### usage:
> gendiff --format [output format] [path to file] [path to file]

If you don't use *--format* output'll be in tree format 
### Output formats:
  gendiff --format **tree** (default value)
  
  gendiff --format **json**
  
  gendiff --format **plain**
  
### Examples:

>gendiff files/before.json files/after.json

[![asciicast](https://asciinema.org/a/K2GmE2EE27CGJisqpFwrGR3eH.svg)](https://asciinema.org/a/K2GmE2EE27CGJisqpFwrGR3eH)

>gendiff --format plain before.yml after.yml

[![asciicast](https://asciinema.org/a/lP6SY9WY6pO2YuyvUkGyPeNP8.svg)](https://asciinema.org/a/lP6SY9WY6pO2YuyvUkGyPeNP8)

>gendiff --format json before.json after.json

[![asciicast](https://asciinema.org/a/AF90ATxLB1CyD6L6Zb8bJSJ5F.svg)](https://asciinema.org/a/AF90ATxLB1CyD6L6Zb8bJSJ5F)
