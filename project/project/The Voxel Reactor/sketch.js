
var myp5 = new p5(sketch);

//Voxelized Polygon and Particles
let boxSz;
let gridSz;
let dropzone;
let pauseButton;
let playButton;
let maxBoxSz;
let minBoxSz;
let zTranslate;

let objRotateX = 0;
let objRotateY = 0;
let objRotateZ = 0;
let boomboom = 0;

let pathPoints = []

//FOR BUFFERS AND GLOBAL VARIABLES
let w;
let buffer, buffer2, buffer3, buffer4, buffer5, buffer6, buffer7, buffer8;
let three, four;
let bg;
let mic, fft;
let sw;
let sh;

//For Digital Matrix (Overlay1)
var stream = [];

//For Perlin Noise Flow Field (Overlay 4)
let numnoise = 1200;
var particles_a = [];
var particles_b = [];
var particles_c = [];
let noiseScale = 500;
let noiseStrength = 4;

//For Gradient Landscape
var inc1 = 0.0019;
var start = 0;
var xAxis = 2;
var yAxis = 1;
var m1, m2, b1, b2; //Mtns and BG

//For Steering Wheel

var numRows;
var numCirclesPerRow;
var rad;
var speed;

//for epic star
var colorCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var actRandomSeed = 0;
var alphaValue = 75;
//STAR EMMISSIONS
var shadow;
var theata = 0;
var myCanvas;
var stars = [];
var speedstar=1




function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
  reInit();
  ScreenFull();

}

//Function to Reintialize Landscape/Scene Sketches.
function reInit() {

  //initMAIN();
  initOverlay1();
  initOverlay2();
  initOverlay3();
  initOverlay4();
  initOverlay5();
  initOverlay6();
  initOverlay7();
  initOverlay8();
  initOverlay9();



  // Creating Buffers named three and four for 3D objects
  three = createGraphics(windowWidth, windowHeight, WEBGL);
  three.noStroke();
 //noCursor();
  four = createGraphics(windowWidth,windowHeight,WEBGL);
  four.noStroke();

  three.background(0);
  three.colorMode(HSB);
  four.background(0);
  four.colorMode(HSB);

  //Variable w for CUBE.
  w = width / 128 - 2;
  sw = width / 64;

  //Starts up Audio Analyzer for Sound Reactivity

  amplitude = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.9, 128);
  fft.setInput(mic);

}

function draw() {

  background(0);
  SceneChange();

  three.resetMatrix();
  three._renderer._update();
  three.background(255,0);
  three.ambientMaterial(250);
  three.ambientLight(60, 120, 60);

  //Calling the Main Voxelized Polygon Function
  drawMAIN();
  texture(three);
  plane(width, height);

}


// Function to clear buffers when changing Scenes/Landscape.
function clearsketch() {
 clear();
}

// Pressing Number Keys changes Landscape/Scenes.
function SceneChange() {

  if (key === '1') {
    clearsketch();
    drawOverlay1();
    texture(buffer);
    plane(width, height);

  } else if (key === '2') {
    clearsketch();
    drawOverlay2();
    texture(buffer2);
    plane(width, height);

  } else if (key === '3') {
    clearsketch();
    drawOverlay3();
    texture(buffer3);
    plane(width, height);

  } else if (key === '4') {
    clearsketch();
    drawOverlay4();
    texture(buffer4);
    plane(width, height);

  } else if (key === '5') {
    clearsketch();
    drawOverlay5();
    texture(buffer5);
    plane(width, height);

  } else if (key === '6') {
    clearsketch();
    drawOverlay6();
    texture(buffer6);
    plane(width, height);

  } else if (key === '7') {
    clearsketch();
    drawOverlay7();
    texture(buffer7);
    plane(width, height);

  } else if (key === '8') {
    clearsketch();
    drawOverlay8();
    texture(buffer8);
    plane(width, height);

  } else if (key === '9') {
    clearsketch();
    drawOverlay9();
    texture(buffer9);
    plane(width, height);

  }
}

// When 'f' or 'F' key is pressed, sketch goes fullscreen.
function ScreenFull() {

if (key === 'f') {
enterFullscreen();
 }
}
//Fullscreen function.
function enterFullscreen () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //reInit();
}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};
