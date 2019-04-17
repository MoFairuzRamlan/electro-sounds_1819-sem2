
/**
 * noise values (noise 2d) are used to animate a bunch of agents.
 *
 * KEYS
 * 1-2                 : switch noise mode
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 */

'use strict';

let sketch = function(p) {
  let agents = [];
  let agentCount = 5000;
  let noiseScale = 1000;
  let noiseStrength = 100;
  let overlayAlpha = 10;
  let agentAlpha = 900;
  let strokeWidth = 0.2;
  let drawMode = 1;
  

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (let i = 0; i < agentCount; i++) {
      agents[i] = new Agent();
    }
  };

  p.draw = function() {
    p.fill(255,overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw agents
    p.stroke(0, agentAlpha);
    for (let i = 0; i < agentCount; i++) {
      if (drawMode == 1) agents[i].update1(noiseScale, noiseStrength, strokeWidth);
      else agents[i].update2(noiseScale, noiseStrength, strokeWidth);
    }
  };

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == '1') drawMode = 1;
    if (p.key == '2') drawMode = 2;
    if (p.key == ' ') {
      var newNoiseSeed = p.floor(p.random(10000));
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  };
};

let myp5 = new p5(sketch);
