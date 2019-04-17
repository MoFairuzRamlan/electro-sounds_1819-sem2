
//This Overlay conjures a SPpherical Space that reacts to audio
//pertaining to the intensity of colour.

function initOverlay7(){
  buffer7 = createGraphics(windowWidth, windowHeight,WEBGL);
  buffer7.background(0);
}

function drawOverlay7(){

//Drawing the Sphere
buffer7.background(spectrum[50], spectrum[20]/2, spectrum[0]);
buffer7.push()
buffer7.fill(spectrum[5], spectrum[60], spectrum[70], 10);
buffer7.stroke(0);
buffer7.strokeWeight(1);
buffer7.push();
buffer7.translate(0,0, 300);
buffer7.rotateX(radians(objRotateX));
buffer7.rotateY(radians(objRotateY));
buffer7.rotateZ(radians(objRotateZ));
buffer7.box(400+spectrum[40]*4);
buffer7.pop();



}
