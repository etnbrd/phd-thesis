function type(d) {
  // d.percentage = +d.percentage;
  return d;
}

function typeLanguage(row){
  return { label: row.language, value: row.percentage };
}

function typeStatus(row){
  return { label: row.status, value: row.percentage };
}

function parseDate(format, date) {
  var parse = d3.time.format(format).parse;
  return parse(date);
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

var lightgray = '#FAFAFA';

var dueEvalDict = {
  nocont: 'No Detected Continuations',
  'eval': 'Presence of eval or with statements',
  lib: 'Promises Libraries',
  err: 'Syntax errors',
  fail: 'Failed to test',
  notest: 'No test provided',
  ok: 'Successful compilation',
}

var languageDict = {
  Cplusplus: 'C++',
  Csharp: 'C sharp',
  EmacsLisp: 'Emacs Lisp',
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
  Perl6Eco: 'Perl 6 Ecosystem (perl 6)',
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

d3.csv('csv/due-evaluation.csv')
  .row(typeStatus)
  .get(pieChartFactory(parent, 'due-evaluation', {dict: dueEvalDict}));

d3.csv('csv/blackduck-languages.csv')
  .row(function(row) {
    return {
      date: parseDate('%Y',row.date),
      C: +row['C'],
      Cplusplus: +row['C++'],
      Java: +row['Java'],
      Javascript: +row['Javascript'],
      PHP: +row['PHP'],
      XMLSchema: +row['XML Schema'],
      Shell: +row['Shell'],
      Autoconf: +row['Autoconf'],
      Python: +row['Python'],
      Ruby: +row['Ruby'],
      Assembler: +row['Assembler'],
      Perl: +row['Perl'],
      Csharp: +row['C#'],
      SQL: +row['SQL'],
      Make: +row['Make']
    };
  })
  .get(lineChartFactory(parent, 'blackduck-languages', {
    yLabel: 'Tags',
    yLabelPadding: 40,
    dict: languageDict
  }));

d3.csv('csv/modulecounts.csv')
  .row(function(row) {
    return {
      date: parseDate('%Y\/%m\/%d',row.date),
      npm: +row['npm (node.js)'],
      Maven: +row['Maven Central (Java)'],
      Rubygems: +row['Rubygems.org'],
      GoDoc: +row['GoDoc (Go)'],
      Packagist: +row['Packagist (PHP)'],
      PyPI: +row['PyPI'],
      nugets: +row['nuget (.NET)'],
      CPAN: +row['CPAN'],
      // Bower: +row['Bower (JS)'],
      // Clojares: +row['Clojars (Clojure)'],
      // CPAN_Search: +row['CPAN (search)'],
      // CRAN: +row['CRAN (R)'],
      // Crates: +row['Crates.io (Rust)'],
      // Drupal: +row['Drupal (php)'],
      // Hackage: +row['Hackage (Haskell)'],
      // Hex: +row['Hex.pm (Elixir/Erlang)'],
      // LuaRocks: +row['LuaRocks (Lua)'],
      // MELPA: +row['MELPA (Emacs)'],
      // Pear: +row['Pear (PHP)'],
      // Perl: +row['Perl 6 Ecosystem (perl 6)'],
    };
  })
  .get(lineChartFactory(parent, 'modulecounts', {
    yLabel: 'Modules',
    yLabelPadding: 50,
    dict: languageDict
  }));

d3.csv('csv/github-languages.csv')
  .row(function(row) {
    return {
      date: parseDate('%Y',row.date),
      Javascript: row['Javascript'],
      Java: row['Java'],
      Ruby: row['Ruby'],
      PHP: row['PHP'],
      Python: row['Python'],
      CSS: row['CSS'],
      Cplusplus: row['C++'],
      Csharp: row['C#'],
      C: row['C'],
      ObjectiveC: row['Objective-C'],
      Perl: row['Perl']
      // HTML: row['HTML'],
      // Shell: row['Shell'],
      // VimL: row['VimL'],
      // EmacsLisp: row['Emacs Lisp'],
    };
  })
  .get(lineChartFactory(parent, 'github-languages', {
    yLabel: 'Rank',
    yLabelPadding: 10,
    dict: languageDict,
    inverse: true,
    yDomain: [1, 10]
  }));

var lastRow = {
  Javascript: 0,
  C: 0,
  Cplusplus: 0,
  Java: 0,
  PHP: 0,
  Ruby: 0,
  Python: 0,
  SQL: 0,
};

d3.csv('csv/stackoverflow-tags.csv')
  .row(function(row) {
    return lastRow = {
      date: parseDate('%Y%m',row.date),
      Javascript: lastRow.Javascript + +row['Javascript'],
      C: lastRow.C + +row['C'],
      Cplusplus: lastRow.Cplusplus + +row['C++'],
      Java: lastRow.Java + +row['Java'],
      PHP: lastRow.PHP + +row['PHP'],
      Ruby: lastRow.Ruby + +row['Ruby'],
      Python: lastRow.Python + +row['Python'],
      SQL: lastRow.SQL + +row['SQL']
    };
  })
  .get(lineChartFactory(parent, 'stackoverflow-tags', {
    yLabel: 'Tags',
    yLabelPadding: 60,
    dict: languageDict
  }));

d3.csv('csv/stackoverflow-languages.csv')
  .row(function(row) {
    return {
      date: parseDate('%Y',row.date),
      Javascript: +row['Javascript'],
      SQL: +row['SQL'],
      Java: +row['Java'],
      Csharp: +row['C#'],
      PHP: +row['PHP'],
      Python: +row['Python'],
      Cplusplus: +row['C'],
      C: +row['C'],
      Nodejs: +row['Node.js'],
      AngularJS: +row['AngularJS'],
      Ruby: +row['Ruby'],
      ObjectiveC: +row['Objective-C']
    };
  })
  .get(lineChartFactory(parent, 'stackoverflow-languages', {
    yLabel: 'Percentage',
    yLabelPadding: 40,
    dict: languageDict
  }));

d3.csv('csv/tiobe.csv')
  .row(function(row) {
    return {
      date: parseDate('%Y%m%d',row.date),
      Javascript: +row['JavaScript'],
      Java: +row['Java'],
      C: +row['C'],
      Cplusplus: +row['C++'],
      Csharp: +row['C#'],
      Python: +row['Python'],
      PHP: +row['PHP'],
      VisualBasicNET: +row['Visual Basic .NET'],
      Assembler: +row['Assembly language'],
      Ruby: +row['Ruby']
    };
  })
  .get(lineChartFactory(parent, 'tiobe', {
    yLabel: 'Percentages',
    yLabelPadding: 10,
    dict: languageDict
  }));

d3.csv('csv/Javascript-timeline.csv')
  .row(function(row) {
    return {
      date: parseDate('%d\/%m\/%Y',row.date),
      event: row.event
    };
  })
  .get(timelineFactory(parent, 'javascript-timeline', {
  }));

d3.csv('csv/visit-count-service-1.csv')
  .row(function(row) {
    return {
      date: parseDate('%m-%Y', row.date),
      visits: row.visits
    }
  })
  .get(lineChartFactory(parent, 'visists', {
    yLabel: 'Visits',
    yLabelPaddin: 30
  }));

/////////////////////////////////////////////////////////////////////
//   Pie Chart
/////////////////////////////////////////////////////////////////////

function pieChartFactory(parent, name, options) {

  var options = options || {};
  options.margin = options.margin || {top: 20, right: 20, bottom: 20, left: 20};
  options.width = 600 - options.margin.left - options.margin.right;
  options.height = 600 - options.margin.top - options.margin.bottom;
  options.innerRadius = 0.18;
  options.outerRadius = 0.25;
  options.breakRadius = 0.28;
  options.textRadius = 0.3;
  options.dict = options.dict || {};


  return function (error, data) {
      if (error) throw error;
      var svg = parent
        .append('svg')
        .attr('width', options.width)
        .attr('height', options.height)
        .attr('class', 'chart')
        .attr('filename', name + '.svg')
        .append('g');

      piechart(svg, data, options);
    }
}

function piechart(svg, data, options) {
  svg.append('g')
    .attr('class', 'slices');
  svg.append('g')
    .attr('class', 'labels');
  svg.append('g')
    .attr('class', 'lines');

  var radius = Math.min(options.width, options.height) / 2;

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    });

  var arc = d3.svg.arc()
    .outerRadius(radius * options.outerRadius)
    .innerRadius(radius * options.innerRadius);

  var outerArc = d3.svg.arc()
    .innerRadius(radius * options.breakRadius)
    .outerRadius(radius * options.breakRadius);

  svg.attr('transform', 'translate(' + options.width / 2 + ',' + options.height / 2 + ')');


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
      pos[0] = radius * options.textRadius * side;
      // pos[1] -= 10;

      if (lastSide && side !== lastSide)
        lastPos = undefined;
      if (lastPos &&  side * (lastPos[1] - pos[1]) > side * offset )
        pos[1] = lastPos[1] + offset * side;

      lastPos = pos;
      lastSide = side;

      return 'translate('+ pos +')';
    })
    .style('font-family', 'Gotham Rounded')
    .style('font-wieght', '100')
    .style('text-anchor', function(d) {
      return midAngle(d) < Math.PI ? 'start':'end';
    })
    .text(function(d) {
      return (options.dict[d.data.label] || d.data.label) + ' (' + d.data.value + '%)';
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
    .attr('stroke-linecap', 'round')
    .attr('points', function(d) {
      // var pos = outerArc.centroid(d);
      // pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1.3 : -1.3);

      var pos = outerArc.centroid(d);
      var side = (midAngle(d) < Math.PI ? 1 : -1);
      pos[0] = radius * (options.textRadius - 0.02) * side;

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

/////////////////////////////////////////////////////////////////////
//   Line Chart
/////////////////////////////////////////////////////////////////////

function lineChartFactory(parent, name, options) {

  var options = options || {};
  options.margin = options.margin || {top: 20, right: 20, bottom: 20, left: 20};
  options.width = 600 - options.margin.left - options.margin.right;
  options.height = 300 - options.margin.top - options.margin.bottom;
  options.dict = options.dict || {};
  // options.xDomain = function() {return undefined};
  // options.yDomain = function() {return undefined};

  return function (error, data) {
      if (error) throw error;

      var svg = parent
        .append('svg')
        .attr('width', options.width + options.margin.left + options.margin.right)
        .attr('height', options.height + options.margin.top + options.margin.bottom)
        .attr('class', 'chart')
        .attr('filename', name + '.svg');
        
        var ratio = 1.11; 
        var margin = 356;

        svg.append('rect')
        .attr('x', -margin * ratio / 2)
        .attr('y', -20)
        .attr('width', options.width + options.margin.left + options.margin.right + margin)
        .attr('height', options.height + options.margin.top + options.margin.bottom + 20)
        .attr('fill', lightgray)


        svg.append('g');

      lineChart(svg, data, options);
    }
}

function lineChart(svg, data, options) {

  var x = d3.time.scale()
      .range([0, options.width]);

  var y = d3.scale.linear()
      .range(options.inverse ? [0, options.height] : [options.height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickPadding(8)
      .ticks(d3.time.month)

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      //.ticks(5)


  // var yTicks = d3.svg.axis()
  //     .scale(y)
  //     .orient('left')
  //     .ticks(5)
  //     .tickSize(-width, 0, 0)
  //     .tickFormat('bite');


  var line = d3.svg.line()
      .defined(function(d) { return (d.value !== 0) })
      // .interpolate('basis')
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

  svg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));
  var series = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, value: +d[name], serie: name};
      })
    };
  });

  x.domain(options.xDomain || d3.extent(data, function(d) { return d.date; }));

  y.domain(options.yDomain || [
    d3.min(series, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
    d3.max(series, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
  ]);



  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + options.height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - options.margin.left - (options.yLabelPadding || 0))
      .attr('x',0 - (options.height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-family', 'Gotham Rounded')
      .style('font-wieght', '100')
      .text(options.yLabel);

  svg.selectAll('.tick text')
      .attr('dy', '3pt')
      .style('font-family', 'Gotham Rounded')
      .style('font-wieght', '100')

  svg.selectAll('.x .tick text')
      .filter(function(d){
        return !(d.getYear()%2 === 0 && d.getMonth() === 0);
      })
      .remove()

  svg.selectAll(".x .tick line")
      .attr("y2", function(d){
        return d.getMonth() === 0 ? 6 : 3;
      })
      .attr("stroke-width", function(d){
        return d.getMonth() === 0 ? '1pt' : '0.4pt';
      })

  svg.selectAll(".tick line")
      .attr('stroke-linecap', 'round');

  var series = svg.selectAll('.serie')
    .data(series.reverse())
    .enter()
    .append('g')
      .attr('class', 'serie');

  series.append('path')
      .attr('class', function(d) { return 'line ' + cleanse(d.name) })
      .attr('d', function(d) { return line(d.values); })
      .attr('fill', 'none') // The default value seems to be black
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')

  var pos = 0;

  var labels = svg.selectAll('.label')
    .data(color.domain())
    .enter()
    .append('g')
      .attr('class', 'label ')
      .attr('transform', function() {
        return 'translate(' + (options.width + 30) + ',' + (20 * pos++) + ')';
      })
      // .attr('x', width)
      // .attr('y', function() {return margin.top + 20 * pos++})


    labels.append('circle')
      .attr('cy','0')
      .attr('cx','0')
      .attr('r','0.4em')
      .attr('class', function(d) { return 'label ' + d });

    labels.append('text')
      .attr('y', '2pt')
      .attr('x', '8pt')
      .style('text-anchor', 'left')
      .style('font-family', 'Gotham Rounded')
      .style('font-wieght', '100')
      .text(function(d) {
        return (options.dict[d] || d);
      });

  // managers.append('text')
  //     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
  //     .attr('transform', function(d) { return 'translate(' + x(d.value.date) + ',' + y(d.value.temperature) + ')'; })
  //     .attr('x', 3)
  //     .attr('dy', '.35em')
  //     .text(function(d) { return d.name; });

}

/////////////////////////////////////////////////////////////////////
//   Timeline
/////////////////////////////////////////////////////////////////////

function timelineFactory(parent, name, options) {

  var options = options || {};
  options.margin = options.margin || {top: 20, right: 20, bottom: 20, left: 20};
  options.width = 600 - options.margin.left - options.margin.right;
  options.height = 300 - options.margin.top - options.margin.bottom;
  options.dict = options.dict || {};
  options.interline = options.interline || 30;
  // options.xDomain = function() {return undefined};
  // options.yDomain = function() {return undefined};

  return function (error, data) {
      if (error) throw error;

      var svg = parent
        .append('svg')
        .attr('width', options.width + options.margin.left + options.margin.right)
        .attr('height', options.height + options.margin.top + options.margin.bottom)
        .attr('class', 'chart')
        .attr('filename', name + '.svg')

        var ratio = 1.11; 
        var margin = 356;

        svg.append('rect')
        .attr('x', -margin * ratio / 2)
        .attr('y', 20)
        .attr('width', options.width + options.margin.left + options.margin.right + margin)
        .attr('height', options.height + options.margin.top + options.margin.bottom - 20)
        .attr('fill', lightgray)

        svg.append('g');

      timeline(svg, data, options);
    }
}

function timeline(svg, data, options) {

  var x = d3.time.scale()
      .range([0, options.width]);

  var y = d3.scale.linear()
      .range(options.inverse ? [0, options.height] : [options.height, 0]);


  var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickPadding(8)
      .ticks(d3.time.month)

  x.domain(options.xDomain || d3.extent(data, function(d) { return d.date; }));

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + options.height + ')')
      .call(xAxis);

  svg.selectAll('.tick text')
      .attr('dy', '3pt')
      .style('font-family', 'Gotham Rounded')
      .style('font-wieght', '100')

  svg.selectAll('.x .tick text')
      .filter(function(d){
        return !(d.getYear()%2 === 0 && d.getMonth() === 0);
      })
      .remove()

  svg.selectAll(".x .tick line")
      .attr("y2", function(d){
        return d.getMonth() === 0 ? 10 : 6;
      })
      .attr("stroke-width", function(d){
        return d.getMonth() === 0 ? '1pt' : '0.4pt';
      })
      .attr('stroke-linecap', 'round');

  var events = svg.selectAll('.events')
    .data(data.reverse())
    .enter()
    .append('g')
      .attr('class', 'event')
      .attr('transform', function(d) {
        return 'translate(' + x(d.date) + ',' + options.height + ')';
      })

   // var lastd = 0;
   // var lastt = options.width + 100;

  data.reduce(function(last, event) {
    var c = Math.cos(Math.PI/4),
        t = x(event.date),
        dt = last.t - t;
    // If the space between the current and previous text line is less than the interline
    // Pull up the current text line so that it fit the interline.
    event.y = (c*(dt - last.d) < options.interline) ? options.interline / c - dt + last.d : 0;

    return {d: event.y, t: t}
  }, {d: 0, t: options.width + 100})

  events.append('g')
      .attr('transform', function (d) {
        return 'translate(5,' + (-25 - d.y) + ') rotate(-45)';
      })
      .append('text')
      .style('text-anchor', 'left')
      .style('font-family', 'Gotham Rounded')
      .style('font-wieght', '100')
      .text(function(d) {
        return d.event;
      });

  events.append('circle')
      .attr('cy','0')
      .attr('cx','0')
      .attr('r','1.5pt')

  events.append('line')
      // .attr('class', 'line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', function(d) { return - 20 - d.y })
      .attr('y2', -7)
      .attr('stroke-width', '1px')
      .attr('stroke', 'black')
      .attr('stroke-linecap', 'round');
      // .attr('fill', 'none') // The default value seems to be black

}
