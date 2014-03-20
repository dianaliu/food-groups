#!/usr/bin/env node

var Crawler = require("crawler").Crawler;
var program = require('commander');
var c;

// TODO: Autowrite to source-group.yml
// TODO: Group fitbit sub-groups under top level group
var initCrawler = {
  'fitbit': function fitbit() {
    c = new Crawler({
      "callback": function(err, result, $) {
        // This is actually a sub-group, like Packaged for Packaged Vegetables.
        var group = $('h1 b').text();
        var $foods = $('tr > td:first-child');

        console.log(group.toLowerCase() + ':');

        $foods.each(function(index, food) {
          console.log('\t- "' + $(food).text() + '"');
        });
      }
    });
  },
  'fatsecret': function fatsecret() {
    c = new Crawler({
      "callback": function(err, result, $) {
        var group = $('h1.title').text();
        var $foods = $('.food_links a');

        console.log(group.toLowerCase() + ':');

        $foods.each(function(index, food) {
          console.log('\t- "' + $(food).text() + '"');
        });
      }
    });
  }
};

// FIXME: Paginate fitbit pages
var queue_links = {
  'fatsecret-grains': function () {
    c.queue('http://www.fatsecret.com/calories-nutrition/group/breads-and-cereals');
  },

  'fatsecret-legumes': function () {
    c.queue('http://www.fatsecret.com/calories-nutrition/group/beans-and-legumes');
  },

  'fatsecret-vegetables': function () {
    c.queue('http://www.fatsecret.com/calories-nutrition/group/vegetables');
  },

  'fitbit-grains': function () {
    c.queue(['https://www.fitbit.com/foods/categories/Cereal+and+Grain+Products/Flour+Meal/178',
      'https://www.fitbit.com/foods/categories/Cereal+and+Grain+Products/Grains+Grasses/176',
      'https://www.fitbit.com/foods/categories/Cereal+and+Grain+Products/Pasta+Noodles/177']);
  },

  'fitbit-legumes': function () {
    c.queue(['https://www.fitbit.com/foods/categories/Legumes/Beans+Peas/185',
      'https://www.fitbit.com/foods/categories/Legumes/Peanuts/186',
      'https://www.fitbit.com/foods/categories/Legumes/Soy+Carob/187']);
  },

  'fitbit-vegetables': function () {
    c.queue(['https://www.fitbit.com/foods/categories/Vegetables/Dried/261',
      'https://www.fitbit.com/foods/categories/Vegetables/Fresh/260',
      'https://www.fitbit.com/foods/categories/Vegetables/Frozen/259',
      'https://www.fitbit.com/foods/categories/Vegetables/Packaged/262'
      ]);
  }
};

program
  .version('0.0.1')
  .usage('-s source -f food')
  .option('-s, --source <source>', 'Select source from [fitbit, fatsecret]')
  .option('-f, --food <food>', 'Select food from [grains, legumes, vegetables]')
  .parse(process.argv);

if(program.source && program.food) {
  if(Object.keys(initCrawler).indexOf(program.source) < 0) {
    throw new Error('Unrecognized source. Valid sources are [fitbit, fatsecret]');
  }

  if(Object.keys(queue_links).indexOf(program.source + '-' + program.food) < 0) {
    throw new Error('Unrecognized food. Valid foods are [grains, legumes, vegetables]');
  }

  initCrawler[program.source]();
  queue_links[program.source + '-' + program.food]();
} else {
  console.error('error: Please supply both a source and food');
  // Display help and exit
  program.help();
}




