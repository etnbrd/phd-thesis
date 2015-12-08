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
    return item.value > 5 ? item.label + ' ' + item.value + '%' : '';
  },
  donut: true,
  donutWidth: 60,
  labelOffset: 0,
  chartPadding: 0
}

function dataFormating(data) {
  data.labels.reduce(function(array, label) {
    array.push(label.value);
    return array
  }, data.series = []);
  return data;
}

function addLabel(labels) {  
  return function (context) {
    if(context.type === 'slice') {
      var label = makeCSSclass(labels.labels[context.index].label);
      context.element.addClass(label);
    }
  }
}

function makeCSSclass(str) {

  return str.replace(' ', '_')
            .replace('#', 'sharp')
            .replace('++', 'plusplus');
}

var chart1 = new Chartist.Pie('.chart-1', dataFormating(lang), options);
var chart2 = new Chartist.Pie('.chart-2', dataFormating(lang2015), options);

chart1.on('draw', addLabel(lang));
chart2.on('draw', addLabel(lang2015));






var modulecount = {

  labels: [    '2010/04',    '2010/05',    '2010/06',    '2010/07',    '2010/08',    '2010/09',    '2010/10',    '2010/11',    '2010/12',    '2011/01',    '2011/02',    '2011/03',    '2011/04',    '2011/05',    '2011/06',    '2011/07',    '2011/08',    '2011/09',    '2011/10',    '2011/11',    '2011/12',    '2012/01',    '2012/02',    '2012/03',    '2012/04',    '2012/05',    '2012/06',    '2012/07',    '2012/08',    '2012/09',    '2012/10',    '2012/11',    '2012/12',    '2013/01',    '2013/02',    '2013/03',    '2013/04',    '2013/05',    '2013/06',    '2013/07',    '2013/08',    '2013/09',    '2013/10',    '2013/11',    '2013/12',    '2014/01',    '2014/02',    '2014/03',    '2014/04',    '2014/05',    '2014/06',    '2014/07',    '2014/08',    '2014/09',    '2014/10',    '2014/11',    '2014/12',    '2015/01',    '2015/02',    '2015/03',    '2015/04',    '2015/05',    '2015/06',    '2015/07',    '2015/08',    '2015/09',    '2015/10',    '2015/11' ],
  seriesLabels: [
    'Bower',
  //  'Clojars ',
  //  'CPAN',
  //  'CPANsearch',
  //  'CRAN',
  //  'Crates',
  //  'GoDoc',
  //  'Hackage',
  //  'Hex',
  //  'LuaRocks',
    'Maven',
  //  'MELPA',
    'nuget',
    'Packagist',
    'Pear',
    'PyPI',
    'Rubygems',
    'npm'
  ],
  series: [
    /*Bower (JS)*/              [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,17129,,20092,21796,23274,24855,26677,28323,30260,32194,34099,35871,37744,39491,42092,43824],
  //  /*Clojars (Clojure)*/       [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,4869,5064,5343,5575,5873,6105,6374,6596,6838,7087,7288,7514,7762,7976,8264,8519,8789,9055,9373,9609,9859,10141,10472,10719,11005,11263,11575,11860,12244,12458,12764,12992,13307,13578,13849,14104],
  //  /*CPAN*/                    [17733,,,,,,,,,19066,19266,19468,,22520,22688,22895,23073,23274,23453,23656,23859,24013,24194,24345,24568,24741,24943,25157,25400,25579,25792,26019,26273,26526,26740,26969,27194,27420,27651,27847,28017,28198,28423,28589,28758,28912,28980,29097,29307,29488,29686,29859,30035,30262,30454,30656,30822,31051,31229,31409,31596,31769,31892,32052,32210,32333,32466,32588],
  //  /*CPAN (search)*/           [,,,,,,,,,,21901,22109,22321,22520,22688,22895,23075,23274,23453,23656,23859,24013,24194,24345,24568,24741,24944,25157,25400,25579,25793,26021,26273,26526,26740,26969,27195,27421,27651,27849,28017,28199,28423,28589,28758,28912,28980,29097,29307,29488,29686,29859,30035,30262,30454,30656,30822,31049,31230,31409,31596,31769,31892,32052,32210,32333,32466,32588],
  //  /*CRAN (R)*/                [,,,,,,,,,,,,,2983,3036,3110,3183,3250,3320,3398,3451,,3576,3636,3714,3759,3846,3900,3964,4020,4063,4119,4172,4205,4289,4376,4415,4479,4576,4660,4723,4802,4870,4980,5062,5049,5168,5248,5373,5493,5577,5686,5789,5836,5898,6004,6127,6149,6258,6388,6470,6587,6707,6784,6956,7096,7242,7415],
  //  /*Crates.io (Rust)*/        [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,415,656,1305,1474,1723,1958,2237,2471,2685,2928,3091,3298],
  //  /*GoDoc (Go)*/              [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,27962,34929,36881,38232,40469,40530,44484,50021,59034,62961,64545,65926,75360,80662,88781,92787,96616],
  //  /*Hackage (Haskell)*/       [,,,,,,,,,,,,,2936,2949,3088,3156,3248,3341,3422,3504,3598,3699,3789,3862,3946,4027,4102,4160,4257,4336,4443,4532,4607,4669,4714,4840,4911,4911,5130,5200,5304,5383,5335,5673,,,6125,6248,6378,6492,6617,6730,6857,6988,7138,7313,7481,7610,7741,7894,8073,8222,8383,8501,8647,8758,8973],
  //  /*Hex.pm (Elixir/Erlang)*/  [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,124,178,205,286,328,378,421,461,523,584,,,808,886,954,1054],
  //  /*LuaRocks (Lua)*/          [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,691,722,740,769,785,800,825,852],
    /*Maven Central (Java)*/    [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,55846,57455,58767,60602,62090,63357,64630,66190,67779,69131,70472,71906,74221,76755,78957,81017,83037,85290,87797,89828,92057,94369,96631,98751,101835,104280,107213,110182,113137,115944,119053,122210],
  //  /*MELPA (Emacs)*/           [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1664,1727,1776,1812,1871,1913,1965,2007,2062,2138,2202,2273,2339,2392,2439,2509,2555,2602,2659,2704,2778],
    /*nuget (.NET)*/            [,,,,,,,,,,,,,,,,,,,,,,,4843,5300,5704,6133,6514,7038,7738,7999,8455,8895,9459,10020,10719,11408,12118,12641,13248,13991,14677,15308,16635,17021,17658,18480,19351,20368,22211,23398,24225,25293,26318,27375,28314,29643,30592,31740,32859,34458,36016,37428,38658,40093,41524,43121],
    /*Packagist (PHP)*/         [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,8062,9200,10328,11459,12641,14007,15243,16705,18272,19795,21413,23239,25053,27016,28950,31082,32973,35125,37376,39367,41665,44072,46480,49154,51998,55126,57748,60526,,66033,69019,71893,75100],
    /*Pear (PHP)*/              [,,,,,,,,,562,563,566,568,568,569,569,570,570,570,571,571,573,577,581,585,586,587,588,588,588,588,588,590,590,593,594,595,595,595,595,595,595,595,595,595,595,595,595,595,595,595,598,598,598,598,599,599,599,600,600,600,600,600,600,601,601,601,601],
    /*PyPI*/                    [9445,,,,,,,,,12642,13163,13513,13977,14470,14990,15541,15916,16439,16918,17405,17918,18308,18889,19459,20193,20653,21362,22064,22836,23606,24366,25205,26136,26647,27621,28571,29521,30490,31335,32189,,34293,35161,36215,37235,38404,39523,40455,41820,43053,44412,45531,46921,48174,49547,50868,52219,53529,54675,55686,57413,58930,60608,62189,63927,65606,67192,68592],
    /*Rubygems.org*/            [11783,,,,,,,,,19235,20308,21347,22401,23437,24616,25661,26672,27760,28973,30076,31251,,33644,35093,36606,38068,39536,40878,42249,43592,44861,46325,47819,49165,,52232,53986,55773,57418,58829,60450,62018,63485,65192,66737,68241,69800,71446,73079,74756,76323,77855,79344,87876,89337,90869,92531,93977,95602,97264,99115,100721,102280,103827,105349,106822,108154,109582],
    /*npm (node.js)*/           [,,,,,,,,,,,,,,,,,,,,,5994,6825,7632,8432,9464,10498,11529,,14054,15360,16895,18522,20020,22070,23972,26470,28935,31329,33865,36697,39522,42613,45882,49308,52986,57308,61656,66873,70833,76126,81078,86453,92110,97446,103477,109499,115298,122334,128950,136792,144743,153037,161055,170410,179947,190275,200682]
  ]
}



var soTagCount = {
  labels: ["2008/08","2008/09","2008/10","2008/11","2008/12","2009/01","2009/02","2009/03","2009/04","2009/05","2009/06","2009/07","2009/08","2009/09","2009/10","2009/11","2009/12","2010/01","2010/02","2010/03","2010/04","2010/05","2010/06","2010/07","2010/08","2010/09","2010/10","2010/11","2010/12","2011/01","2011/02","2011/03","2011/04","2011/05","2011/06","2011/07","2011/08","2011/09","2011/10","2011/11","2011/12","2012/01","2012/02","2012/03","2012/04","2012/05","2012/06","2012/07","2012/08","2012/09","2012/10","2012/11","2012/12","2013/01","2013/02","2013/03","2013/04","2013/05","2013/06","2013/07","2013/08","2013/09","2013/10","2013/11","2013/12","2014/01","2014/02","2014/03","2014/04","2014/05","2014/06","2014/07","2014/08","2014/09","2014/10","2014/11","2014/12","2015/01","2015/02","2015/03","2015/04","2015/05","2015/06","2015/07","2015/08","2015/09","2015/10","2015/11"],
  seriesLabels: ['C', 'C++', 'Java', 'PHP', 'Ruby', 'Python', 'SQL', 'Javascript'],
  series: [
/* c */             [0,89,336,305,262,190,326,334,435,465,484,509,547,535,581,782,981,859,996,1044,1134,1188,1193,1172,1298,1388,1404,1465,1685,1483,1488,1653,2118,2062,1852,1786,1679,1835,1930,2158,2232,2036,2256,2438,2777,2706,2518,2356,2417,2356,2582,3204,3237,2618,2957,3158,3517,3609,3260,3003,3078,3049,3457,4315,4347,3578,3803,4035,4665,4100,3332,2823,2893,2719,3295,3874,3789,3311,3363,3517,4118,4153,3702,3297,2959,2715,3234,3958,3052],
/* c++ */           [0,166,772,813,743,639,863,856,1062,1030,1232,1268,1474,1420,1475,1703,1772,1667,2001,2292,2453,2511,2426,2848,2712,2673,2768,2978,3402,3171,3542,3494,4228,4227,3952,3860,3901,4002,3985,4399,4546,4430,4634,5178,5314,5395,5071,4723,5380,5253,4987,5998,6365,5783,6141,6206,7347,7274,6942,6277,6650,6321,6638,8102,8242,7122,7796,7793,8810,8261,6913,5820,6391,6005,6352,6969,6854,6552,6609,6935,7986,7663,7350,7084,7210,6378,6395,7787,6037],
/* java */          [227,1162,1158,968,843,1164,1222,1450,1550,1840,2126,2293,2207,2283,2528,2782,2711,3753,3619,4487,3926,4212,4346,4577,4783,4782,5108,5679,5767,6654,6994,8626,8021,8713,8051,8285,8834,8466,8673,9770,9335,10295,11174,12664,12263,12424,11316,12492,12443,11823,13743,13861,12681,14009,14110,16268,16585,15564,14208,15414,15240,16506,19036,19041,17734,18948,19621,22370,21251,18318,16244,17692,16005,17045,18249,18814,18179,18246,18607,22081,21719,20454,19817,20825,19082,19070,21380,15868],
/* php */           [0,163,493,625,508,481,646,778,909,978,1194,1588,2045,2207,2281,2387,2712,2850,3471,3190,3776,3683,4020,4144,4682,5233,4770,4603,5224,5499,6549,6846,8292,7828,8246,8174,8859,9124,8277,8247,8881,8506,9525,10158,11183,10697,11223,10866,12071,12238,11223,12073,12124,11395,13226,13011,14646,13869,13483,13037,14683,14639,14614,15750,15253,14797,17289,17012,18862,18201,15247,13427,14707,13606,13765,14019,13905,13765,15152,15023,16733,16512,16035,16059,17205,15929,15214,15957,11803],
/* ruby */          [0,75,291,253,161,164,211,289,331,359,408,434,505,486,481,493,662,572,690,695,697,757,782,865,920,1009,949,930,936,1030,1213,1260,1652,1484,1574,1571,1599,1884,1566,1622,1759,1715,1931,2057,2224,2005,2018,1909,2089,2091,1973,2285,2150,1922,2331,2264,2600,2505,2364,2244,2462,2503,2415,2803,2592,2467,2788,2641,2970,2763,2686,2355,2571,2484,2284,2357,2186,2308,2646,2491,2667,2713,2706,2802,2766,2501,2317,2422,1626],
/* python */        [0,129,544,516,455,446,634,640,763,770,999,1045,1170,1144,1175,1428,1574,1596,1958,1868,2083,1827,2026,2233,2633,2513,2270,2692,2637,2513,2936,3044,3787,3379,3552,3495,3710,3866,3544,3662,3905,3658,4242,4536,5086,4966,5158,5322,5801,5906,5311,6197,6465,5817,6656,6830,7739,8023,7894,7672,8674,7992,8037,9583,9583,8547,9934,9994,11527,10906,9374,9014,10051,9229,8906,9733,9950,9743,10480,11094,12575,12305,12047,12775,13440,12210,11885,13937,10271],
/* sql */           [0,148,501,539,413,426,588,669,663,742,848,928,1086,1031,1360,1481,1219,1187,1261,1294,1469,1327,1454,1636,1844,1928,1751,1864,1985,1901,2362,2138,2676,2309,2723,2667,2694,2690,2606,2606,2861,2608,2813,3171,3638,3372,3529,3342,3754,3723,3640,4138,4373,3910,4699,4620,5299,5102,5021,4776,5448,5405,5944,6896,6614,6310,7118,7019,7828,7903,6863,6447,6948,6288,6409,5508,4382,4409,4675,4627,5260,5080,4885,4941,5143,4683,4547,4729,3627],
/* javascript */    [164,640,723,573,630,791,953,1011,1054,1436,1563,1751,1866,1748,2038,2231,2305,2620,2647,2985,3030,3234,3500,3901,4053,4062,4169,4612,5024,5512,5672,6854,7031,7394,7776,8180,9010,8306,8128,8788,8411,9704,10121,10872,10862,11708,11409,12541,12628,11304,12572,12530,11912,14036,13983,15607,15624,15188,14767,17024,17029,17916,19963,18733,18230,21363,21421,22981,21746,20112,18614,20399,18762,18376,19221,18903,18788,20581,20765,22995,22947,24301,25012,26553,24596,23886,24811,18292]
  ]
}









// We are setting a few options for our chart and override the defaults
var options = {
  showPoint: false,
  lineSmooth: false,
  // X-Axis specific configuration
  // Y-Axis specific configuration
  axisY: {
    // Lets offset the chart a bit from the labels
    offset: 60,
    // The label interpolation function enables you to modify the values
    // used for the labels on each axis. Here we are converting the
    // values into million pound.
  },
  axisX: {
    labelInterpolationFnc: function(label) {
      var date = label.split('/');

      return date[1] === '01' ? date[0] : '';
    }
  }
};

var options = {
  showPoint: false,
  lineSmooth: false,
  axisY: {
    offset: 60,
  },
  axisX: {
    labelInterpolationFnc: function(label) {
      var date = label.split('/');

      return date[1] === '01' ? date[0] : '';
    }
  }
};


var counter = 0;

function addLine(labels) {  
  return function (context) {
    if(context.type === 'line') {
      var label = makeCSSclass(labels.seriesLabels[context.index]);
      context.element.addClass(label);
    }
  }
}

function drawAxis(context) {
    if(context.type === 'label') {

      counter += 1 % 11;
      if (counter !== 0)
        context.element.text('');
    }
}

var chart3 = new Chartist.Line('.chart3', modulecount, options);
var chart4 = new Chartist.Line('.chart4', soTagCount, options);
var chart5 = new Chartist.Line('.chart5', tiobe2015, options);


chart3.on('draw', addLine(modulecount));
chart4.on('draw', addLine(soTagCount));
chart5.on('draw', addLine(tiobe2015));