# frontend-project-lvl2
[![Maintainability](https://api.codeclimate.com/v1/badges/72882b90b08047b9f08f/maintainability)](https://codeclimate.com/github/evvs/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/72882b90b08047b9f08f/test_coverage)](https://codeclimate.com/github/evvs/frontend-project-lvl2/test_coverage)

Compare two files and generate difference

Supported file formats: *json, ini, yml*

### install:
> npm install frontend-project-lvl2-evvs

### usage:
> gendiff --format [output format] [path to file] [path to file]

If you don't use *--format* output'll be tree format 
### Output formats:
  gendiff --format **tree** (default value)
  
  gendiff --format **json**
  
  gendiff --format **plain**
  
### Examples:
>gendiff beforeDeep.json afterDeep.json

>gendiff files/beforeDeep.json files/afterDeep.json

[![asciicast](https://asciinema.org/a/89iq5sFe1jLk5G3nwr3nJ0zFc.svg)](https://asciinema.org/a/89iq5sFe1jLk5G3nwr3nJ0zFc)

>gendiff --format plain beforeDeep.yml afterDeep.yml

[![asciicast](https://asciinema.org/a/BnQpZz5KjbBZD9PvXjLUlCyym.svg)](https://asciinema.org/a/BnQpZz5KjbBZD9PvXjLUlCyym)

>gendiff --format json beforeDeep.json afterDeep.json

[![asciicast](https://asciinema.org/a/GTcZyEsk0ltYaV8Ac5vNgsc0q.svg)](https://asciinema.org/a/GTcZyEsk0ltYaV8Ac5vNgsc0q)
