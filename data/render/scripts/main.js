function type(d) {
  // d.percentage = +d.percentage;
  return d;
}

function typeLanguage(row){
  return { label: row.language, value: row.percentage }
}

function typeDate(format) {
  var parse = d3.time.format(format).parse;

  return function(row) {
    row.date = parse(row.date);
    return row;
  }
}

function key(d) {
  return d.data.label;
};

function cleanse(label) {
  return label.replace(/[+]/g, 'plus')
              .replace(/ /g, '_')
              .replace(/[#]/g, 'sharp')
              .replace(/[()./]/g, '');
}

function threshold(d) {
  return d.value > 1.6;
}

    
function midAngle(d){
  return d.startAngle + (d.endAngle - d.startAngle)/2;
}

var vectorLabels = {
  Cplusplus: 'C++',
  Csharp: 'C sharp',
  VisualBasicNET: 'Visual Basic .NET',
  Bower: 'Bower (JS)',
  Clojares: 'Clojars (Clojure)',
  CPAN: 'CPAN (Perl)',
  CPAN_Search: 'CPAN (search)',
  CRAN: 'CRAN (R)',
  Crates: 'Crates.io (Rust)',
  Drupal: 'Drupal (php)',
  GoDoc: 'GoDoc (Go)',
  Hackage: 'Hackage (Haskell)',
  Hex: 'Hex.pm (Elixir/Erlang)',
  LuaRocks: 'LuaRocks (Lua)',
  Maven: 'Maven Central (Java)',
  MELPA: 'MELPA (Emacs)',
  nugets: 'nuget (.NET)',
  Packagist: 'Packagist (PHP)',
  Pear: 'Pear (PHP)',
  Perl: 'Perl 6 Ecosystem (perl 6)',
  PyPI: 'PyPI (Python)',
  Rubygems: 'Rubygems.org',
  npm: 'npm (node.js)'
}

var parent = d3.select('#charts');


d3.csv('csv/blackduck-alltime.csv')
  .row(typeLanguage)
  .get(pieChartFactory(parent, 'blackduck-alltime'));

d3.csv('csv/blackduck-2015.csv')
  .row(typeLanguage)
  .get(pieChartFactory(parent, 'blackduck-2015'));

d3.csv('csv/stackoverflow-mostwanted.csv')
  .row(typeLanguage)
  .get(pieChartFactory(parent, 'stackoverflow-mostwanted'));

d3.csv('csv/modulecounts.csv')
  .row(function(row) {
    var row = typeDate('%Y\/%m\/%d')(row);
    return {
      date: row.date,
      // Bower: +row['Bower (JS)'],
      // Clojares: +row['Clojars (Clojure)'],
      CPAN: +row['CPAN'],
      // CPAN_Search: +row['CPAN (search)'],
      // CRAN: +row['CRAN (R)'],
      // Crates: +row['Crates.io (Rust)'],
      // Drupal: +row['Drupal (php)'],
      GoDoc: +row['GoDoc (Go)'],
      // Hackage: +row['Hackage (Haskell)'],
      // Hex: +row['Hex.pm (Elixir/Erlang)'],
      // LuaRocks: +row['LuaRocks (Lua)'],
      Maven: +row['Maven Central (Java)'],
      // MELPA: +row['MELPA (Emacs)'],
      nugets: +row['nuget (.NET)'],
      Packagist: +row['Packagist (PHP)'],
      // Pear: +row['Pear (PHP)'],
      // Perl: +row['Perl 6 Ecosystem (perl 6)'],
      PyPI: +row['PyPI'],
      Rubygems: +row['Rubygems.org'],
      npm: +row['npm (node.js)']
    };
  })
  .get(lineChartFactory(parent, 'modulecounts', {xLabel: 'Modules'}));

d3.csv('csv/stackoverflow-tags.csv')
  .row(function(row) {
    var row = typeDate('%Y%m')(row);
    return {
      date: row.date,
      C: +row['C'],
      Cplusplus: +row['C++'],
      Java: +row['Java'],
      PHP: +row['PHP'],
      Ruby: +row['Ruby'],
      Python: +row['Python'],
      SQL: +row['SQL'],
      Javascript: +row['Javascript']
    };
  })
  .get(lineChartFactory(parent, 'stackoverflow-tags', {xLabel: 'Tags'}));

d3.csv('csv/tiobe.csv')
  .row(function(row) {
    var row = typeDate('%Y%m%d')(row);
    return {
      date: row.date,
      Java: +row['Java'],
      C: +row['C'],
      Cplusplus: +row['C++'],
      Csharp: +row['C#'],
      Python: +row['Python'],
      PHP: +row['PHP'],
      VisualBasicNET: +row['Visual Basic .NET'],
      Assembler: +row['Assembly language'],
      Ruby: +row['Ruby'],
      Javascript: +row['JavaScript']
    };
  })
  .get(lineChartFactory(parent, 'tiobe', {xLabel: 'Percentages'}));


function pieChartFactory(parent, name) {
  return function (error, data) {
      if (error) throw error;
      var svg = parent
        .append('svg')
        .attr('width', 950)
        .attr('height', 600)
        .attr('class', 'chart')
        .attr('filename', name + '.svg')
        .append('g');

      piechart(svg, data, 950, 600);
    }
}

function piechart(svg, data, width, height) {
  svg.append('g')
    .attr('class', 'slices');
  svg.append('g')
    .attr('class', 'labels');
  svg.append('g')
    .attr('class', 'lines');

  var radius = Math.min(width, height) / 2;

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    });

  var arc = d3.svg.arc()
    .outerRadius(radius * 0.4)
    .innerRadius(radius * 0.2);

  var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.5);

  svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


  /* ------- PIE SLICES -------*/
  var slice = svg.select('.slices').selectAll('path.slice')
    .data(pie(data), key);

  slice.enter()
    .insert('path')
    .attr('class', function(d) { return 'slice ' + cleanse(d.data.label) })
    .attr('d', function(d) {return arc(d)});

  // /* ------- TEXT LABELS -------*/

  var text = svg.select('.labels').selectAll('text')
    .data(pie(data), key);

  var lastPos;
  var lastSide;
  var offset = 20;

  text.enter()
    .append('text')
    // .filter(threshold)
    .attr('dy', '.35em')
    .attr('transform', function(d) {

      var pos = outerArc.centroid(d);
      var side = (midAngle(d) < Math.PI ? 1 : -1);
      pos[0] = radius * 0.55 * side;
      // pos[1] -= 10;

      if (lastSide && side !== lastSide)
        lastPos = undefined;
      if (lastPos &&  side * (lastPos[1] - pos[1]) > side * offset )
        pos[1] = lastPos[1] + offset * side;

      lastPos = pos;
      lastSide = side;

      return 'translate('+ pos +')';
    })
    .style('text-anchor', function(d) {
      return midAngle(d) < Math.PI ? 'start':'end';
    })
    .text(function(d) {
      return d.data.label.replace('#', ' sharp') + ' (' + d.data.value + '%)';
    });

  // /* ------- SLICE TO TEXT POLYLINES -------*/

  var polyline = svg.select('.lines').selectAll('polyline')
    .data(pie(data), key);

  lastPos = undefined;
  lastSide = undefined;
  
  polyline.enter()
    .append('polyline')
    // .filter(threshold)
    .attr('fill', 'none') // The default value seems to be black
    .attr('class', function(d) { return 'line ' + cleanse(d.data.label) })
    .attr('points', function(d) {
      // var pos = outerArc.centroid(d);
      // pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1.3 : -1.3);

      var pos = outerArc.centroid(d);
      var side = (midAngle(d) < Math.PI ? 1 : -1);
      pos[0] = radius * 0.53 * side;

      if (lastSide && side !== lastSide)
        lastPos = undefined;
      if (lastPos &&  side * (lastPos[1] - pos[1]) > side * offset )
        pos[1] = lastPos[1] + offset * side;

      lastPos = pos;
      lastSide = side;

      var midPoint = outerArc.centroid(d);
      midPoint[0] += Math.tan(midAngle(d)) * side * (pos[1] - midPoint[1]);
      midPoint[1] = pos[1];
      return [arc.centroid(d), midPoint, pos];
    });
}


function lineChartFactory(parent, name, options) {

  var margin = {top: 20, right: 200, bottom: 30, left: 100},
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  return function (error, data) {
      if (error) throw error;
      var svg = parent
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'chart')
        .attr('filename', name + '.svg')
        .append('g');

      lineChart(svg, data, width, height, margin, options);
    }
}

function lineChart(svg, data, width, height, margin, options) {

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(10)
      .tickPadding(34);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(5)

      
  // var yTicks = d3.svg.axis()
  //     .scale(y)
  //     .orient('left')
  //     .ticks(5)
  //     .tickSize(-width, 0, 0)
  //     .tickFormat('bite');


  var line = d3.svg.line()
      .defined(function(d) { return (d.count !== 0) })
      .interpolate('basis')
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.count); });

  svg.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));

  var series = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, count: +d[name], serie: name};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(series, function(c) { return d3.min(c.values, function(v) { return v.count; }); }),
    d3.max(series, function(c) { return d3.max(c.values, function(v) { return v.count; }); })
  ]);

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x',0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(options.xLabel);

  var series = svg.selectAll('.serie')
    .data(series)
    .enter()
    .append('g')
      .attr('class', 'serie');

  series.append('path')
      .attr('class', function(d) { return 'line ' + cleanse(d.name) })
      .attr('d', function(d) { return line(d.values); })
      .attr('fill', 'none') // The default value seems to be black

  var pos = 0;

  var labels = svg.selectAll('.label')
    .data(color.domain())
    .enter()
    .append('g')
      .attr('class', 'label ')
      .attr('transform', function() {
        return 'translate(' + (width + 30) + ',' + (40 * pos++) + ')';
      })
      // .attr('x', width)
      // .attr('y', function() {return margin.top + 20 * pos++})


    labels.append('circle')
      .attr('cy','0')
      .attr('cx','0')
      .attr('r','0.4em')
      .attr('class', function(d) { return 'label ' + d });

    labels.append('text')
      .attr('y', '10pt')
      .attr('x', '20pt')
      .style('text-anchor', 'left')
      // .style('alignement-baseline', 'top')
      .text(function(d) {
        return (vectorLabels[d] || d);
      });

  // managers.append('text')
  //     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
  //     .attr('transform', function(d) { return 'translate(' + x(d.value.date) + ',' + y(d.value.temperature) + ')'; })
  //     .attr('x', 3)
  //     .attr('dy', '.35em')
  //     .text(function(d) { return d.name; });

}