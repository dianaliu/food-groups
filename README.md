## About
Get a list of foods for a food group. Sourced from Fitbit and FatSecret.

## Usage
Install dependencies `npm install`

Make the file executable `chmod u+x food-groups.js`

Pass --source and --group. `./food-groups.js --source fatsecret --group vegetables`

Pipe output to file. `./food-groups.js -s fitbit -g legumes > legumes.yml`


````
  Usage: food-groups.js -s source -g group

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -s, --source <source>  Select source from [fitbit, fatsecret]
    -g, --group <group>    Select group from [grains, legumes, vegetables]
````