function initOverlay3() {
  buffer3 = createGraphics(windowWidth, windowHeight);
}

//Function to Begin Spectrum Analyzer
function drawOverlay3() {
  buffer3.background(spectrum[0]/4, spectrum[90], spectrum[78]);

  // let spectrum = fft.analyze();

  buffer3.beginShape();

  buffer3.stroke(255)

  for (i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i] * 0.8;
    var y = map(amp, 0, 255, height, 0);

    buffer3.line(i * sw, height, i * sw, y);
  }
  buffer3.endShape();
}
