


function initOverlay5() {
   buffer5 = createGraphics(windowWidth, windowHeight);
  buffer5.background(0);
}

//Simple Colour of Background reacting to Audio
function drawOverlay5() {
  // let spectrum = fft.analyze();

  buffer5.background(spectrum[80]-1, spectrum[60]-1, spectrum[30]-1);

}
