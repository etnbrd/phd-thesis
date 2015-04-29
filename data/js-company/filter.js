var fs = require('fs');
var stages = require('./stages.json');
var blacklist = require('./blacklist.json');
var table = {};


stages.content.map(function(stage) {
  var id = stage.id;


  ['profile', 'project', 'objectives', 'context'].map(function(field) {

    if (stage[field]) stage[field].split(/[\s.(),;\/:«»…•'’”“"°+]+/).map(function(word) {

      word = word.toUpperCase();

      table[word] = table[word] || {};
      table[word][id] = 1;
    })
  })
})

var words = Object.keys(table).map(function(word) {
  return {
    occ: Object.keys(table[word]).length,
    word: word
  }
})

words = words.filter(function(word) {
  // return false;
  return blacklist.indexOf(word.word) === -1;
})

words.sort(function(a, b) {
  return b.occ - a.occ;
})

var file = fs.createWriteStream('keywordsStages.md');

words.forEach(function(word) {
  file.write(word.word + ' ' + word.occ + '\n');
})

file.end();