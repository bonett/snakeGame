var mycanvas  = document.getElementById('mycanvas');
var context   = mycanvas.getContext('2d');
var snakeSize = 16;
var w         = 800;
var h         = 800;
var score     = 0;
var snake;
var food;
var reverseLimit = 10;