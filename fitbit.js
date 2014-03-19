#!/usr/bin/env node

var Crawler = require("crawler").Crawler;
var c = new Crawler({
  "callback": function(err, result, $) {
    // This is actually a sub-group, like Packaged for Packaged Vegetables.
    var group = $('h1 b').text();
    var $foods = $('tr > td:first-child');

    console.log(group.toLowerCase() + ':');

    $foods.each(function(index, food) {
      console.log('\t- "' + $(food).text() + '"');
    })
  }
});

grains();
// vegetables();
// legumes();

function vegetables() {
  // FIXME: These links are actually paginated

  c.queue(['https://www.fitbit.com/foods/categories/Vegetables/Dried/261',
    'https://www.fitbit.com/foods/categories/Vegetables/Fresh/260',
    'https://www.fitbit.com/foods/categories/Vegetables/Frozen/259',
    'https://www.fitbit.com/foods/categories/Vegetables/Packaged/262'
    ]);
}

function legumes() {
  c.queue(['https://www.fitbit.com/foods/categories/Legumes/Beans+Peas/185',
    'https://www.fitbit.com/foods/categories/Legumes/Peanuts/186',
    'https://www.fitbit.com/foods/categories/Legumes/Soy+Carob/187']);
}

function grains() {
  c.queue(['https://www.fitbit.com/foods/categories/Cereal+and+Grain+Products/Flour+Meal/178',
    'https://www.fitbit.com/foods/categories/Cereal+and+Grain+Products/Grains+Grasses/176',
    'https://www.fitbit.com/foods/categories/Cereal+and+Grain+Products/Pasta+Noodles/177']);
}




