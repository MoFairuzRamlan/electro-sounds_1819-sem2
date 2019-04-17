// Sequencer

// Try changing this number to change the tempo. BPM stands for Beats Per Minute. 
// 60 BPM means we play one beat every second (since there are 60 seconds in a minute)
var bpm = 60;

// Try changing these numbers to change the length and structure of your grid
var numberOfBars = 1;
var beatsPerBar = 4;
var splitBeatsInto = 2;
var nSteps = numberOfBars * beatsPerBar * splitBeatsInto;

// Try changing the number of octaves to get more or less notes to choose from
var numberOfOctaves = 1;
var nTracks = 7 * numberOfOctaves;
var cells = [];
var currentStep = 0;

// Visuals
var t = 30;
var l = 25;
var gridWidth, gridHeight, cellWidth, cellHeight;
var blue;
var colors = ["#df365d", "#f2924d", "#ebd64e", "#97c348", "#4ab4a1", "#4f64d5", "#bd51a6"];


var synth = new Tone.Synth().toMaster();

// Sound
var player;
var noteNames = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
var startOctave = 2;

player = new Tone.Synth(
    {
    "C2" : "samples/casio/D2.mp3",
     "D2" : "samples/casio/D2.mp3",
     "E2" : "samples/casio/E2.mp3",
      "F2" : "samples/casio/F2.mp3",
      "G2" : "samples/casio/G2.mp3",
      "A2" : "samples/casio/A2.mp3",
      "B2" : "samples/casio/B2.mp3",
    }
);
player.toMaster();
Tone.Transport.scheduleRepeat(onBeat, "2n");

function setup() {
  if(currentStep = 1){
    hits();
  }
  // Initialize all sequencer cells.ON: 1. OFF: 0.
  for(var track = 0; track < nTracks; track++){
    cells[track] = [];
    for(var step = 0; step < nSteps; step++){
        cells[track][step] = 0;
        if (nTracks-track-1 == step) cells[track][step] = 1;
    }
  }

  playButton = createButton('play');
  playButton.position(540, 10);
  playButton.mouseClicked(togglePlay);

  createCanvas(600, 300);
  gridWidth = width - 2*l;
  gridHeight = height - 2*t;
  cellWidth = gridWidth / nSteps;
  cellHeight = gridHeight / nTracks;
  blue =  color(178, 223, 247);
}

function onBeat(time){
  var velocity = 0.5;
  for(var track = 0; track < nTracks; track++){
    if(cells[track][currentStep] == 1){
      // The bottom track should have the lowest note
      var notePos = nTracks - 1 - track; 
      var octave = floor(notePos / 7);
      var noteName = noteNames[notePos % 7];
      player.triggerAttack(noteName + (startOctave + octave));
    }
  }
  currentStep = (currentStep + 1) % nSteps;
  
  
  console.log(currentStep, notePos);
  
  //if(currentStep = 1){
    //synth.triggerAttackRelease ('C4', '8n');
  //}
  
  
}

function hits(){
    synth.triggerAttackRelease ('C4', '8n');  
}

function draw(){
  background(255);
  stroke(blue);
  // Draw cells that are on
  for(var step = 0; step < nSteps; step++){
    for(var track = 0; track < nTracks; track++){
      if(cells[track][step]){
        var notePos = nTracks - 1 - track; 
        var col = colors[notePos % 7];
        fill(col);
        rect(l+ step*cellWidth, t + track*cellHeight, cellWidth, cellHeight);
      }
    }
  }
  // Draw horizontal lines
  for(var i = 0; i <= nTracks; i++){
    var y = t + i*cellHeight;
    right = width - l;
    
    // If we are at the end of the octave, draw a thicker line. 
    if(i % 7 == 0 && 0 < i && i < nTracks){
      strokeWeight(2);
    }
    else{
      strokeWeight(0.5);
    }
    line(l, y, right, y);
  }
  // Draw vertical lines
  for(var i = 0; i <= nSteps; i++){
    right = width - l;
    
    // If a step is on an odd bar, draw a shading rect
    var bar = floor(i / beatsPerBar);
    if( bar % 2 == 1 & i < nSteps){
      //shade
      noStroke();
      fill(0, 10);
      rect(l + i*cellWidth, t, cellWidth, gridHeight);
    }
    
    stroke(blue);
    // If a step is a beat, draw a thicker line. If it is a subdivision, draw a thinner line
    if(i % splitBeatsInto == 0){
      strokeWeight(1);
    }
    else{
      strokeWeight(0.5);
    }
    line(l + i*cellWidth, t, l + i*cellWidth, t + gridHeight);
    
    // Highlight current step
    if(i == (currentStep - 1) && Tone.Transport.state == "started"){
      fill(178, 223, 247, 50);
      noStroke();
      rect(l + i*cellWidth, t, cellWidth, gridHeight)
    }
  }
}

function mousePressed(){
  // If the mouse is within the bounds of the canvas
  if( l < mouseX && mouseX < l + gridWidth &&
      t < mouseY && mouseY < t + gridHeight){
    // Account for margins
    var x = mouseX - l;
    var y = mouseY - t;
    // Determine which cell the mouse is on
    var i = floor(x / cellWidth);
    var j = floor(y / cellHeight);
    // Toggle cell on/off
    cells[j][i] = !cells[j][i];
  }
}

function togglePlay(){
  if(Tone.Transport.state == "started"){
    Tone.Transport.stop();
    playButton.html('play');
  }
  else{
    Tone.Transport.start();
    playButton.html('stop');
  }
  
}