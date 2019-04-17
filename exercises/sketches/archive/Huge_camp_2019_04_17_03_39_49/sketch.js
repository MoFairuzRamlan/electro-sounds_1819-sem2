let steps = [];
let index = 0;
let t0= new Tone.MembraneSynth();

function setup() {
  createCanvas(600,600);
  noStroke();
for(let i=0; i<8; i++){
  steps[i]= i % 2 == 0 ? 0 :1;
}
  console.log(steps);
  
  t0.oscillator.type = 'square';
  
  t0.toMaster();
  
  
  
}

function draw() {
  background(0,255,120);
  
  push();
  translate(100,200)
  
  for(let i=0; i<8; i++){
  if(i==index){
    fill(0);
  } else {
    fill(255)}
  rect(0,0,40,40);
  translate(50,0);
  }
  pop();
  if(frameCount % 16 === 0) {
  index = index+1;
  if(index === 8){
    //t0.triggerAttackRelease('C4', '4n');
    index = 0;
  }
  }
  //console.log(index);
  triggerSound(steps[index]);
   
}

function triggerSound(theIndex){
  if(theIndex ===0){
    t0.triggerAttackRelease('C5', '4n');
  }else if (theIndex == 1){
    t0.triggerAttackRelease('B4', '16n');
  }
}