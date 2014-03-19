#!/usr/bin/env node

// To make executable, chmod u+x fatsecret.js

var Crawler = require("crawler").Crawler;
var c = new Crawler({
  "callback": function(err, result, $) {
    var group = $('h1.title').text();
    var $foods = $('.food_links a');

    console.log(group.toLowerCase() + ':');

    $foods.each(function(index, food) {
      console.log('\t- "' + $(food).text() + '"');
    })
  }
});

// TODO: Autowrite to source-group.yml
// TODO: Read arguments to determine source and food group
// TODO: Show list of all food groups/options available

// var args = process.argv[2];

grains();
// vegetables();
// legumes();

function vegetables() {
  c.queue('http://www.fatsecret.com/calories-nutrition/group/vegetables');
}

function legumes() {
  c.queue('http://www.fatsecret.com/calories-nutrition/group/beans-and-legumes');
}

function grains() {
  c.queue('http://www.fatsecret.com/calories-nutrition/group/breads-and-cereals');
}




