let s4 = function(p) {
// use Tone.js to create a Player
//trigger callback function for when the sample is loaded
let player = new Tone.GrainPlayer("./assets/Chords.wav");
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
p.OSlider, p.GSlider, p.PBSlider, p.DSlider, p.LSSlider, p.LESlider;
let s1

p.setup = function(){

  p.createCanvas (600, 600);
  //colorMode(HSB, height, height, height);
  //noStroke();
  p.background(255, 255, 0);

  //1chk1 = select("#box1").elt;

  playbutton = p.createButton('Play');
  playbutton.position(0, p.height*10);
  playbutton.mousePressed(sampleLoaded);

  stopbutton = p.createButton('Stop');
  stopbutton.position(0, 20);
  stopbutton.mousePressed(sampleStop);

  resetbutton = p.createButton('Reset');
  resetbutton.position(0, 40);
  resetbutton.mousePressed(Reset);



  p.OSlider = p.createSlider(0, 500, 0);
  p.OSlider.position(p.width/4, 20);
  p.GSlider = p.createSlider(10, 500, 10);
  p.GSlider.position(p.width/4, 40);
  p.PBSlider = p.createSlider(5, 40, 10);
  p.PBSlider.position(p.width/4, 60);
  p.DSlider = p.createSlider(-2400, 2400, 0);
  p.DSlider.position(p.width/4, 80);
  p.LSSlider = p.createSlider(0, 26, 0);
  p.LSSlider.position(p.width/4, 100);
  p.LESlider = p.createSlider(0, 26, 0);
  p.LESlider.position(p.width/4, 120);





}

p.draw = function(){
  looper();
  direction();


  p.text('overlap', p.width/4 + OSlider.width +5, 33);
  p.text('grainsize', p.width/4 + OSlider.width +5, 52);
  p.text('play back rate', p.width/4 + OSlider.width +5, 72);
  p.text('detune', p.width/4 + OSlider.width +5, 92);
  p.text('loop start', p.width/4 + OSlider.width +5, 112);
  p.text('loop end', p.width/4 + OSlider.width +5, 132);


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
 player.volume.value = -5;
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
  if(p.key === '3'){
   player.loop = true;
  } else if (p.key === '4'){
    player.loop = false;
  }

}

function direction(){
  if (p.key === '1') {
    player.reverse = true;
  } else if (p.key === '2') {
    player.reverse = false;

  }
}
}

p3 = new p5(s4, 'sketch-4');
