var http = require('http');
var fs = require('fs');
var cheerio = require("cheerio");
var csv = require('csv-write-stream')

var TIOBE = {
  download : true,
  url : 'http://www.tiobe.com/content/paperinfo/tpci/index.html',
  file : '../csv/tiobe.csv',
  begin : '$(function () {\n  $(\'#container\').highcharts(',
  end : ');\n});'
}

var ModuleCounts = {
  download: false,
  url : 'http://www.modulecounts.com/modulecounts.csv',
  file : '../csv/modulecounts.csv'
}

function fetch(url, callback) {
  var body = '';

  http.get(url, function(res) {
    res.on('data', function(chunk) {
      body +=  chunk;
    });
    res.on('end', function() {
      callback(null, body);
    })
  }).on('error', function(e) {
    callback(e);
  });
}


function toCSV(series) {

  var rows = {};
  var headers = ['date'];

  series.forEach(function(column, i) {

    headers[i+1] = column.name;

    column.data.forEach(function(row) {

      var date = (new Date(row[0]))
                 .toISOString()
                 .split('T')[0]
                 .replace(/-/g, '');

      rows[date] = rows[date] || [];
      rows[date][i] = row[1];
    });


  });

  return {headers: headers, rows: rows};
}

function WriteFile(data, filename, callback) {
  fs.writeFile(filename, data, function(error) {
      if(error)
          return console.log(error);
      callback();
  }); 
}

function WriteTable(table, filename) {
  var writer = csv({headers: table.headers});
  writer.pipe(fs.createWriteStream(filename))

  for (var row in table.rows) {
    writer.write([row].concat(table.rows[row]))
  }

  writer.end();
}



// TIOBE
if (TIOBE.download) {
  fetch(TIOBE.url, function(error, body) {
    if (error)
      return console.error("Got error: " + e.message);

    var $ = cheerio.load(body);
    
    $('script').each(function(i, e) {
      if (i === 2) {
        var data = e.children[0].data;
        data = data.substring(data.indexOf(TIOBE.begin) + TIOBE.begin.length, data.lastIndexOf(TIOBE.end));

        eval('var data = ' + data);

        WriteTable(toCSV(data.series), TIOBE.file);

        console.log('TIOBE ✓');
      }

    });
  })
}

// ModuleCounts

if (ModuleCounts.download) {
  fetch(ModuleCounts.url, function(error, body) {
    if (error)
      return console.error("Got error: " + e.message);

    WriteFile(body, ModuleCounts.file, done);

    function done() {
      console.log('ModuleCounts ✓');
    }
  })
}
