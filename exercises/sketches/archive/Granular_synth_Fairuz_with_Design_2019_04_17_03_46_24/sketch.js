
// use Tone.js to create a Player
//trigger callback function for when the sample is loaded
let player = new Tone.GrainPlayer("./Chords.wav");
// make the file loop
//player.reverse = true; 
player.loop = true;
player.grainSize = 0.1;
player.playbackRate = 1
player.overlap = 0
player.toMaster();

let playbutton;
let stopbutton;
let chk1;
let OSlider, GSlider, PBSlider, DSlider, LSSlider, LESlider;
let s1;

var inc1 = 0.0019;
var start = 0;
var xAxis = 2;
var yAxis = 1;
var m1,m2,b1,b2; //Mtns and BG

function setup(){
  
  createCanvas (500, 500);
  m1 = color(119,164,76,150); //104,134,90
  m2 = color(218,100,43);
  b1 = color(191,43,70,150);
  b2 = color(80,235,186,155);
  o1 = color(255,255,255,0);
  o2 = color(80,235,186,155);
  background(255);
  frameRate(30)
  
  //1chk1 = select("#box1").elt;
  
  playbutton = createButton('Play');
  playbutton.position(0, 0);
  playbutton.mousePressed(sampleLoaded);
  
  stopbutton = createButton('Stop');
  stopbutton.position(0, 20);
  stopbutton.mousePressed(sampleStop);
  
  resetbutton = createButton('Reset');
  resetbutton.position(0, 40);
  resetbutton.mousePressed(Reset);
  
  
  
  OSlider = createSlider(0, 500, 0);
  OSlider.position(width/4, 20);
  GSlider = createSlider(10, 500, 10);
  GSlider.position(width/4, 40);
  PBSlider = createSlider(5, 40, 10);
  PBSlider.position(width/4, 60);
  DSlider = createSlider(-2400, 2400, 0);
  DSlider.position(width/4, 80);
  LSSlider = createSlider(0, 50, 0);
  LSSlider.position(width/4, 100);
  LESlider = createSlider(0, 50, 0);
  LESlider.position(width/4, 120);
  
  
  
  
  
}

function draw(){
  
  mtn2();
  mtn();
  setGradient(0, 400, width, height, o1, o2, yAxis);
  
  looper();
  direction();

  fill(255)
  text('overlap', width/4 + OSlider.width +5, 33);
  text('grainsize', width/4 + OSlider.width +5, 52);
  text('play back rate', width/4 + OSlider.width +5, 72);
  text('detune', width/4 + OSlider.width +5, 92);
  text('loop start', width/4 + OSlider.width +5, 112);
  text('loop end', width/4 + OSlider.width +5, 132);
  text('Fairuz Granular Sampler 2019', width - 180, height/28)


  const Overlap = OSlider.value()/1000
  const Grainsize = GSlider.value()/1000
  const PlayRate = PBSlider.value()/10
  const Detune = DSlider.value()
  const LoopStart = LSSlider.value()/10
  const LoopEnd = LESlider.value()/10
  
  
  player.detune = Detune;
  player.grainSize = Grainsize;
  player.playbackRate = PlayRate;
  player.loopStart = LoopStart;
  player.loopEnd = LoopEnd;
  
  
}


function sampleLoaded() {
  // player.grainSize = map( movement_z, -10, 10, 0.1, 1);
 player.volume.value = -10;
player.start();
}

function sampleStop(){
  player.stop();
}

function Reset(){

player.loop = true;
player.grainSize = 0.1;
player.playbackRate = 1
player.overlap = 0
player.loopStart = 0
player.loopEnd = 0
//player.toMaster();
}

function looper(){
  if(key === '3'){
   player.loop = true; 
  } else if (key === '4'){
    player.loop = false;
  } 
  
}

function direction(){
  if (key === '1') {
    player.reverse = true;
  } else if (key === '2') {
    player.reverse = false;
    
  }
}

				function mtn(){
  //setGradient(0, 0, width, height, m1, m2, yAxis); //Mtns
  noStroke();
                   fill(191,43,70);
  beginShape();
  var xoff=start+900;
  for(var x=0; x<width; x++){
    var y = noise(xoff)*800;
    vertex(x,y)
    xoff+=inc1
  }
  vertex(width, noise(xoff)*800)
  vertex(width,height)
  vertex(0,height)
  endShape();
  start += inc1;
                  
  }

function mtn2(){
  setGradient(0, 0, width, height, b1, b2, yAxis);
  noStroke();
  fill(15,220,145);
  beginShape();
  var xoff=start;
  for(var x=0; x<width; x++){
    var y = noise(xoff)*350;
    vertex(x,y)
    xoff+=0.0035
  }
  vertex(width, random(xoff)*350)
  vertex(width,0)
  vertex(0,0)
  endShape();
  start += 0.0035;
  }

				function setGradient(x, y, w, h, m1, m2, axis){
  if (axis == yAxis) {
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(m1, m2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
}




