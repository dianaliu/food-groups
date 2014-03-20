#!/usr/bin/env node

var Crawler = require("crawler").Crawler;
var program = require('commander');
var c;

var initCrawler = {
  'fitbit': function fitbit() {
    c = new Crawler({
      "callback": function(err, result, $) {
        // This is actually a sub-group, like Packaged for Packaged Vegetables.
        var group = $('h1 b').text();
        var $foods = $('tr > td:first-child');

        // console.log(group.toLowerCase() + ':');

        $foods.each(function(index, food) {
          if($(food).text().indexOf("\"") > -1) {
            // Use single quotes if there is a double quote in the name
            // Usually, for inches
            console.log('\t- \'' + $(food).text() + '\'');
          } else {
            // Use double quotes in other situations
            // Usually for apostrophes
            // God help us all if there is a food with both double and single apostrophes.
            console.log('\t- "' + $(food).text() + '"');
          }
        });


        // Find and queue additional pages
        // Loops through page 1 of each sub-group, then page 2 of each sub-group, etc.
        var $currentPage = $('#content ul li:not(:has(a))');
        if($currentPage.next('li').length > 0) {
          var nextPage = $currentPage.next('li').find('a').attr('href');
          nextPage = 'https://www.fitbit.com' + nextPage;
          c.queue(nextPage);
        }

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
  .usage('-s source -g group')
  .option('-s, --source <source>', 'Select source from [fitbit, fatsecret]')
  .option('-g, --group <group>', 'Select group from [grains, legumes, vegetables]')
  .parse(process.argv);

if(program.source && program.group) {
  if(Object.keys(initCrawler).indexOf(program.source) < 0) {
    throw new Error('Unrecognized source. Valid sources are [fitbit, fatsecret]');
  }

  if(Object.keys(queue_links).indexOf(program.source + '-' + program.group) < 0) {
    throw new Error('Unrecognized group. Valid groups are [grains, legumes, vegetables]');
  }

  initCrawler[program.source]();
  queue_links[program.source + '-' + program.group]();
} else {
  console.error('error: Please supply both a source and group');
  // Display help and exit
  program.help();
}




