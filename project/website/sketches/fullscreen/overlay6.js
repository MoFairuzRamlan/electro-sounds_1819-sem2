function initOverlay6(){

  //Creating the Buffer
  buffer6 = createGraphics(windowWidth, windowHeight);
  buffer6.background(0);
  //Color fro Mountains and Landscape
  m1 = color(119,164,76,150); //104,134,90
  m2 = color(218,100,43);
  b1 = color(191,43,70,150);
  b2 = color(80,235,186,155);
  o1 = color(255,255,255,0);
  o2 = color(80,235,186,155);

}

function drawOverlay6(){
    mtn2();
    mtn();
    setGradient(0, 1000, width, height, o1, o2, yAxis);
}

//Function draws Mountain
function mtn(){
 let level = mic.getLevel();
  let mtnsz = map(level, 0, 0.3, 1900, 1500);

  //let spectrum = fft.analyze();

  //setGradient(0, 0, width, height, m1, m2, yAxis); //Mtns
  buffer6.noStroke();
  buffer6.fill(191,0.5*spectrum[40],spectrum[20]);
  buffer6.beginShape();
  var xoffgrad=start+900;
  for(var xgrad=0; xgrad<width; xgrad++){
    var ygrad = (noise(xoffgrad*2.5)*mtnsz);
    buffer6.vertex(xgrad,ygrad)
    xoffgrad+=inc1
  }
  buffer6.vertex(width, noise(buffer.xoffgrad)*800)
  buffer6.vertex(width,height)
  buffer6.vertex(0,height)
  buffer6.endShape();
  buffer6.start += inc1;

  }

//Function to create mountains.
function mtn2(){
  setGradient(0, 0, width, height, b1, b2, yAxis);
  buffer6.noStroke();
  buffer6.fill(15,220,145);
  buffer6.beginShape();
  var xoffgrad =start;
  for(var xgrad=0; xgrad<width; xgrad++){
    var ygrad = noise(xoffgrad)*700;
    buffer6.vertex(xgrad,ygrad)
    buffer6.xoffgrad+=0.0035
  }
  buffer6.vertex(width, random(xoffgrad)*350)
  buffer6.vertex(width,0)
  buffer6.vertex(0,0)
  buffer6.endShape();
  start += 0.0035;
  }

//Function to set the gradient for the colour.
function setGradient(xgrad, ygrad, w, h, m1, m2, axis){
  if (axis == yAxis) {
    for (var i = ygrad; i <= ygrad+h; i++) {
      var inter = map(i, ygrad, ygrad+h, 0, 1);
      var c = lerpColor(m1, m2, inter);
      buffer6.stroke(c);
      buffer6.line(xgrad, i, xgrad+w, i);
    }
  }
}
