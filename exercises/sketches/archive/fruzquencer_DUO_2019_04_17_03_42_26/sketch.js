let t0;
let t1;
let steps = [];
let steps2 = [];
let beats = [];
let beats2 = [];
let index = 0;
let index2 = 0;
let numberOfSteps = 8;
let numberOfSteps2 = 8;
let randomize = false;
let t0Slider, t1Slider;
let panvol = new Tone.PanVol(0, -12);
let panvol2 = new Tone.PanVol(0, 0);
var reverb = new Tone.JCReverb(0.5).connect(Tone.Master);
var delay = new Tone.FeedbackDelay(0.1);


function setup() {
  createCanvas(600, 600);
  textSize(15);
  noStroke();
  smooth(0);
  
  // create sliders
  t0Slider = createSlider(1, 128, 100);
  t0Slider.position(20, 20);
  t1Slider = createSlider(1, 128, 100);
  t1Slider.position(20, 50);
  //rSlider = createSlider(0, 50, 0);
  //rSlider.position(20, 80);

  initSynths();
  newBeat();
  newBeat2();

  // create 8 Steps using a loop
  for (let i = 0; i < numberOfSteps; i++) {
    steps[i] = new Step(i, 70 + i * 30, height/4);
  }

// create 8 Steps using a loop
  for (let i = 0; i < numberOfSteps2; i++) {
    steps2[i] = new Step(i, 70+ i * 30, height/2);
  }
}


function initSynths() {
  t0 = new Tone.AMSynth();
  t0.oscillator.type = 'triangle';
  t0.chain(reverb,delay,panvol, Tone.Master);

  t0.envelope.attack = 0.02;
  t0.envelope.decay = 0.1;
  t0.envelope.sustain = 0.6;
  t0.envelope.release = 0.6;
  
  t1 = new Tone.AMSynth();
  t1.oscillator.type = 'triangle';
  t1.chain(reverb,delay, Tone.Master);

  t1.envelope.attack = 0.02;
  t1.envelope.decay = 0.02;
  t1.envelope.sustain = 0.08;
  t1.envelope.release = 0.08;

}

function draw() {
  background(0,32);
  
  const t0s = t0Slider.value();
  const t1s = t1Slider.value();
  //const rev = rSlider.value();
  fill(255);
  text('T1 Speed', t0Slider.x * 2 + t0Slider.width, 35);
  fill(255);
  text('T2 Speed', t1Slider.x * 2 + t1Slider.width, 65);
  //fill(255);
 // text('Reverb Size', rSlider.x * 2 + rSlider.width, 95);
  console.log(t0s, t1s);
  

  push();
  // iterate array steps using the forEach function
  // and draw each Step
  steps.forEach((el) => {
    el.draw();
  });
  fill(0,0,0);
  translate(70 + index*30,200);
  rect(0,0,20,4);
	pop();
  
  push();
  // iterate array steps using the forEach function
  // and draw each Step
  steps2.forEach((em) => {
    em.draw();
  });
  fill(255,0,0);
  translate(70 + index2*30,height/4 + height/3);
  rect(0,0,20,4);
	pop();

  
  if (frameCount % t0s === 0) {
    index = index + 1;
    if (index === numberOfSteps) {
      index = 0;
      if(randomize === true) newBeat();
    }
    steps[index].update();
    
  }
  
  if (frameCount % t1s === 0) {
    index2 = index2 + 1;
    if (index2 === numberOfSteps2) {
      index2 = 0;
      if(randomize === true) newBeat2();
    }
    steps2[index2].update();
    
  }
}



function newBeat() {
  for (let i = 0; i < numberOfSteps; i++) {
    beats[i] = floor(map(random(), 0, 1, 1, 8));
  }
  console.log(beats);
}

function newBeat2() {
  for (let i = 0; i < numberOfSteps; i++) {
    beats2[i] = floor(map(random(), 0, 1, 1, 8));
  }
  console.log(beats2);
}

function triggerSound(theIndex) {
  let n = beats[theIndex];
  if (n === 1) {
    t0.triggerAttackRelease('C2', '4n');
  } else if (n === 2) {
    t0.triggerAttackRelease('F3', '16n');
  } else if (n === 3) {
    t0.triggerAttackRelease('B2', '16n');
  } else if (n === 4) {
    t0.triggerAttackRelease('D4', '4n');
  } else if (n === 5) {
    t0.triggerAttackRelease('E3', '4n');
  } else if (n === 6) {
    t0.triggerAttackRelease('F2', '4n');
  } else if (n === 7) {
    t0.triggerAttackRelease('C4', '4n');
  } else if (n === 8) {
    t0.triggerAttackRelease('A2', '4n');
  }

}

function triggerSound2(theIndex2) {
  let m = beats2[theIndex2];
  if (m === 1) {
    t1.triggerAttackRelease('E5', '4n');
  } else if (m === 2) {
    t1.triggerAttackRelease('F4', '16n');
  } else if (m === 3) {
    t1.triggerAttackRelease('C3', '16n');
  } else if (m === 4) {
    t1.triggerAttackRelease('A4', '4n');
  } else if (m === 5) {
    t1.triggerAttackRelease('E2', '4n');
  } else if (m === 6) {
    t1.triggerAttackRelease('G5', '4n');
  } else if (m === 7) {
    t1.triggerAttackRelease('C5', '4n');
  } else if (m === 8) {
    t1.triggerAttackRelease('A3', '4n');
  }

}


function mousePressed() {
  steps.forEach((el) => {
    el.click();
  });
  steps2.forEach((em) => {
    em.click();
  });
}

function keyTyped() {
      if (key === ' ') {
        newBeat();
        } else
  if (key === 'a') {
        newBeat2();
        }
}

