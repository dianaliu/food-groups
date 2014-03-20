## About
Get a list of foods for a food group. Sourced from Fitbit and FatSecret.

## Usage
Install dependencies `npm install`

Make the file executable `chmod u+x food-groups.js`

Pass --source and --food. `./food-groups.js --source fatsecret --food vegetables`

Pipe output to file. `./food-groups.js -s fitbit -f legumes > legumes.yml`


````
  Usage: food-groups.js -s source -f food

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -s, --source <source>  Select source from [fitbit, fatsecret]
    -f, --food <food>      Select food from [grains, legumes, vegetables]
````