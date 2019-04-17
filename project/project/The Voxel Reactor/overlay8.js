
//This Overlay conjures a Loop of Ellipses that reacts to audio
//pertaining to the intensity of colour and number of ellipses.

function initOverlay8(){
  buffer8 = createGraphics(windowWidth, windowHeight);
   buffer8.colorMode(HSB);
    buffer8.background(0);

    numRows = 30;
    numCirclesPerRow = 30;
    rad = 20;
    speed = 0.05;
}

function drawOverlay8() {
  buffer8.background(spectrum[30], spectrum[50], 0, 255);
  numRows = map(spectrum[0], 0, 255, 5, 60);
  numCirclesPerRow = map(spectrum[20], 0, 255, 2,40);

  for (var r=0; r<numRows; r++) {
    for (var i=0; i<numCirclesPerRow; i++) {

      var cx = map(i, 0, numCirclesPerRow, -100, width+100);
      var cy = map(r, 0, numRows, -100, height+100);

      var distFromCenter = dist(cx, cy, width/2, height/2);
      var angle = frameCount*speed + distFromCenter*0.02 + i*0.1;

      var x = cx + rad * cos(angle);
      var y = cy + rad * sin(angle);

      var offset = map(frameCount, 0, TWO_PI/speed, 0, 255);
      var h_ = (distFromCenter + offset) % spectrum[40];
      var s_ = spectrum[30];
      var b_ = spectrum[10];

      buffer8.fill(h_, s_, b_);
      buffer8.ellipse(x, y, 8, 8);
    }
  }
}
