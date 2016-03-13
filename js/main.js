Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

master = [['green','cross'],
['orange','circle'],
['purple','square'],
['blue','triangle'],
['red','heart']];

function make_legend() {
  for (var i=0;i<master.length;i++) {
    var props = master[i];
    var color = props[0];
    var form = props[1];
    var div = $('<div class="shape-holder"></div>');
    var shape = $('<div>');
    shape.data('color',color);
    shape.data('form',form);
    shape.addClass(color).addClass(form);
    div.append(shape);
    $('.legend').append(div);
  }
}

make_legend();

function case_one(array) {
  var newArray = array.slice();
  newArray = shuffle(newArray);
  removed = newArray.splice(0,1);
  var shape1 = removed[0];
  var shape2 = [newArray[0][0],newArray[1][1]]
  var figures = shuffle([shape1, shape2]);
  var answer = shape1;
  return [figures, answer];
}

function case_two(array) {
  var newArray = array.slice();
  var remove = getRandomInt(0,newArray.length);
  var removed = newArray.splice(remove,1);
  removed = removed[0];
  newArray = shuffle(newArray);
  var shape1 = [newArray[0][0],newArray[1][1]];
  var shape2 = [newArray[2][0],newArray[3][1]];
  figures = [shape1, shape2];
  answer = removed;
  return [figures, answer];
}

colors = {'red':"#CC0063",
          'orange':"#FE9601",
          'purple':"#86269B",
          'blue':"#00D2F1",
          'green':"#00B796"}

shapes = ['heart', 'cross','triangle','square','circle']
shape_rules = {'heart':[".heart:before",".heart:after"],
              'cross':['.cross','.cross:after']}

rules = {".heart:before":  "background:",
        ".heart:after": "background:",
        ".cross":"background:",
         ".cross:after":"background:",
        ".triangle":"border-bottom-color:",
         ".square":"background:",
          ".circle":"background:"}

style_string = '<style>'
for (var key in colors) {
  if (colors.hasOwnProperty(key)) {
    console.log(colors[key]);
    for (var rKey in rules) {
      if (rules.hasOwnProperty(rKey)) {
        var style_string = style_string+'.'+key + rKey+'{'+rules[rKey]+colors[key]+'} ';
      }
    }
  }
}
style_string = style_string + '</style>'
var style = $(style_string);
$('html > head').append(style);
// console.log(style_string);

// var style = $('<style>.class { background-color: blue; }</style>');
// $('html > head').append(style);

$(function() {
  $('#new-shapes').click(function() {
    $('#challenge').html('');
    if (Math.random() > .83) {
      round = case_one(master);
    } else {
      round = case_two(master);
      var figures = case_two(master);
    }
    var figures = round[0];
    var answer = round[1];
    for (var i=0;i<figures.length;i++) {
      var div = $('<div class="shape-holder"></div>');
      var shape = $('<div>');
      var form = figures[i][1];
      var color = figures[i][0];
      shape.addClass(color).addClass(form);
      div.append(shape);
      $('#challenge').append(div);
    }
    console.log([]+answer);
  });
  $('.legend').on('click','.shape-holder',function() {
    var color = $(this).find('div').data('color');
    var form = $(this).find('div').data('form');
    var description = color + form;
    console.log(description);
  });
});
