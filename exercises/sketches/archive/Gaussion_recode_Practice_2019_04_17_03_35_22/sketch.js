


function setup() {
  
  createCanvas(400,400);
  smooth();
  background(255);
  
  update();
}

function draw(){
  
}

function update() {
  for (let i=0;  i<1000; i++)  {
  let x = random(0,width);
  let y = floor(randomGaussian(height/2,50))
  noStroke()
  fill(0)
  ellipse(x,y,3,3);
 
} 
}

function mousePressed() {
  update();
}