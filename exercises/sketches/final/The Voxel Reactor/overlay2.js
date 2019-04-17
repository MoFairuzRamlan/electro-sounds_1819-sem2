function initOverlay2() {
  buffer2 = createGraphics(windowWidth, windowHeight);
}

//Function to Begin Spectrum Analyzer
function drawOverlay2() {
  buffer2.background(spectrum[30]/4, 255, spectrum[50]);
  buffer2.colorMode(HSB);

  // let spectrum = fft.analyze();

  buffer2.beginShape();

  noStroke();


  for (i = 0; i < spectrum.length; i+=1) {
    var amp = spectrum[i] * 0.8;
    var y = map(amp, 0, 255, height, 0);
    buffer2.fill(i, 200, 100);
    noStroke();

    buffer2.rect(i * sw, y, sw - 2, height - y);
  }
  buffer2.endShape();
}
