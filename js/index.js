var canvas = document.getElementById("myCanvas");
var multiple = 0;
var color = "white";
 var dpr = window.devicePixelRatio || 1;
 canvas.width = 1000 * dpr;
canvas.height = 1000 * dpr;
var ctx = canvas.getContext('2d');
// Scale all drawing operations by the dpr, so you
// don't have to worry about the difference.
ctx.scale(dpr, dpr);
// var gradient = ctx.createLinearGradient(0, 0, 1000, 0);
// gradient.addColorStop(0, "cyan");
// gradient.addColorStop(1, "lightgreen");

// var gradient = ctx.createLinearGradient(0.000, 000, 1000.000, 1000.000);
// gradient.addColorStop(0.000, 'rgba(10, 0, 178, 1.000)');
// gradient.addColorStop(0.500, 'rgba(255, 0, 0, 1.000)');
// gradient.addColorStop(1.000, 'rgba(255, 252, 0, 1.000)');

var gradient = ctx.createLinearGradient(10, 0, 1000, 0);
gradient.addColorStop(1 / 24, 'red');
gradient.addColorStop(2 / 24, 'orange');
gradient.addColorStop(3 / 24, 'yellow');

gradient.addColorStop(2 / 6, '#66ff33');
gradient.addColorStop(3 / 6, '#94ff00');
gradient.addColorStop(4 / 6, 'red');
gradient.addColorStop(1, 'violet');

color=gradient;

// ctx.arc(canvas.width / 2, 350, 200, 0, 2 * Math.PI);


//  center = [x  , y  ];
var center = [canvas.width / 3, 300];
var radius = 270;
var count = 40;
var x = 0;
var y = 0;
var numberToCheck = 1;
var inputs = document.getElementById("inputs");
var inc;
var multiple = Number(inputs.multiple.value);
//declare variables
var multipleMode = inputs.multiplemode.checked;

var allPoints = {};
var pointsToCheck = {};
var numArray = [];

function init() {
  // draw();
  setInterval(draw, 1);
}
function draw() {
  count = inputs.count.value;
  var outline = inputs.outline.checked;
  var multipleMode = inputs.multiplemode.checked;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  if (outline) {
    ctx.fillStyle = color;
    ctx.arc(canvas.width / 3, 300, 270, 0, 2 * Math.PI);
    // ctx.stroke();
  }
  //redraw circle

  var incrementer = Number(inputs.speed.value);
  inc = incrementer;
  //increment count
  // count+=1;
  //wipe variables
  pointsToCheck = {};
  numArray = [];
  multiple = Number(inputs.multiple.value)
  // if(numberToCheck>1000){
  //   numberToCheck=1;
  // }
  if(multipleMode){
    if(multiple != numberToCheck){
      numberToCheck = multiple;
    }  
  }
  else{
     multiple=numberToCheck;
  }
  //round multiple to thousandths
  $("#multiple").val(Math.round(multiple * 10000.00) / 10000);
  // multiple = Number(inputs.multiple.value);
  // multiple = numberToCheck;
  numberToCheck += incrementer;

  //generate divisions based on count
  for (var i = 1; i < count + 1; i++) {
    var baseAngle = 360 / count;
    var finalAngle = baseAngle * i;
    var radians = finalAngle * Math.PI / 180;
    x = radius * Math.cos(radians);
    y = radius * Math.sin(radians);
    numArray.push(i);
    pointsToCheck[i] = [x, y];;
    // ctx.moveTo(center[0],center[1]);
    // ctx.lineTo(center[0]+x,center[1]+y);
  }

  var timesTableLinks = [];

  for (var i = 0; i < count; i++) {
    var link = [];
    var pointer = numArray[i] * numberToCheck;

    // link = allPoints[idx];

    var baseAngle = 360 / count;

    var finalAngle = baseAngle * pointer;

    var radians = finalAngle * Math.PI / 180;

    x = radius * Math.cos(radians);
    y = radius * Math.sin(radians);
    link = [x, y];

    ctx.moveTo(
      center[0] + pointsToCheck[numArray[i]][0],
      center[1] + pointsToCheck[numArray[i]][1]
    );
    ctx.lineTo(center[0] + link[0], center[1] + link[1]);

  }


  // Fill with color
  ctx.strokeStyle = color;
  ctx.stroke();
}
init();

$("#count").bind("input", function() {
  $("#counts").html("Points: " + count);
});

$("#speed").bind("input", function() {
  $("#speeds").html("Speed: +" + inc+"/ms");
});
$(document).ready(function() {
  $("#counts").html("Points: " + count);
  $("#speeds").html("Speed: +" + inc+"/ms");
});