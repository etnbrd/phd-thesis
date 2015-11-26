var lang = {

  description: 'The data below reflect an analysis of approximately one million open source projects currently tracked in the Black Duck Knowledgebase. The chart reflects the breakdown by language for the last release of all projects. These projects come from the many forges, foundations and organizations that make up the overall open source community, and span many years including projects that were written in the early days of the Internet.  A significant percentage of these releases occurred more than twelve months ago.',

  labels: [
    {label: 'C',                 value: 50.11},
    {label: 'C++',               value: 11.19},
    {label: 'Java',              value:  8.54},
    {label: 'Javascript',        value:  8.04},
    {label: 'PHP',               value:  4.19},
    {label: 'Shell',             value:  2.29},
    {label: 'Autoconf',          value:  2.19},
    {label: 'Python',            value:  1.81},
    {label: 'Ruby',              value:  1.72},
    {label: 'Assembler',         value:  1.67},
    {label: 'Perl',              value:  1.33},
    {label: 'C#',                value:  1.03},
    {label: 'XML Schema',        value:  0.98},
    {label: 'SQL',               value:  0.85},
    {label: 'Make',              value:  0.75},
  ]
}


var lang2015 = {

  description: 'The data below reflect a language analysis of open source projects that have been active in the most recent twelve month period. These projects are tracked in the Black Duck Knowledgebase, reflecting the many forges, foundations and organizations that make up the overall open source community.',

  labels: [
    {label: 'Javascript',      value: 24.32},
    {label: 'C',               value: 23.84},
    {label: 'C++',             value: 19.01},
    {label: 'Java',            value: 13.46},
    {label: 'PHP',             value:  2.81},
    {label: 'XML Schema',      value:  2.37},
    {label: 'Ruby',            value:  2.19},
    {label: 'Autoconf',        value:  2.10},
    {label: 'Python',          value:  1.94},
    {label: 'C#',              value:  1.22},
    {label: 'Assembler',       value:  1.04},
    {label: 'Shell',           value:  0.88},
    {label: 'SQL',             value:  0.80},
    {label: 'Make',            value:  0.74},
    {label: 'Perl',            value:  0.73},
  ]
}



var options = {
  labelInterpolationFnc: function(item, i) {
    return item.value > 5 ? item.label + '' + item.value + '%' : '';
  },
  donut: true,
  donutWidth: 60,
  labelOffset: 0,
  chartPadding: 20
}

function dataFormating(data) {
  data.labels.reduce(function(array, label) {
    array.push(label.value);
    return array
  }, data.series = []);
  return data;
}

new Chartist.Pie('.chart-1', dataFormating(lang), options);
new Chartist.Pie('.chart-2', dataFormating(lang2015), options);



setTimeout(demoSvgDocument, 1000);


function demoSvgDocument() {

  console.log('Render SVG to PDF');

    var doc = new jsPDF();
    // console.log(
      var svgText = document.querySelector('.chart-1 svg')
    //  );

    var svgXMLText = new XMLSerializer().serializeToString(svgText);
    
    console.log(svgXMLText);

    doc.addSVG(svgXMLText, 20, 20, doc.internal.pageSize.width - 20*2)
    // doc.save('TestSVG.pdf');

    // var test = $.get('.ct-chart svg', function(svgText){
    //   console.log(svgText);
    //     var svgAsText = new XMLSerializer().serializeToString(svgText.documentElement);

    //     // Save the PDF
    //     console.log(doc);
    // });
}  




// I recommend to keep the svg visible as a preview
// var svg = $('#container > svg').get(0);

// var svg = document.querySelector('.ct-chart');
// // you should set the format dynamically, write [width, height] instead of 'a4'
// var pdf = new jsPDF('p', 'pt', 'a4');
// svgElementToPdf(svg, pdf, {
//     scale: 72/96, // this is the ratio of px to pt units
//     removeInvalid: true // this removes elements that could not be translated to pdf from the source svg
// });
// pdf.output('datauri'); // use output() to get the jsPDF buffer



// As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
// as you saw in the previous example
// var options = {
//   width: 300,
//   height: 200
// };

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object. As a third parameter we pass in our custom options.
// new Chartist.Bar('.ct-chart', data, options);
