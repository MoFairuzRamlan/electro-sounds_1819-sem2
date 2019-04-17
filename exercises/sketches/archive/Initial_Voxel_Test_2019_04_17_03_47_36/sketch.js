let mic;
let fft;
let boxSz;
let gridSz;
let dropzone;
let pauseButton;
let playButton;
let maxBoxSz;
let minBoxSz;
let zTranslate;

/*
function preload() {
  song = loadSound('music/orangeevening.mp3');
}
*/

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  
  
  mic = new p5.AudioIn();
  mic.start();

  //starts up audio analyzer
  amplitude = new p5.Amplitude();
  //0.9 smoothing and 64 frequency bands
  fft = new p5.FFT(0.5, 64);
  fft.setInput(mic);
  
}


//Draws the voxelized polygon
function draw() {
  //Size of voxel sphere
  boxSz = 300;
  //Amount of voxels
  let spectrum = fft.analyze();
  //Gets level of amplitude
  let level = amplitude.getLevel();

  //console.log(level);
  console.log(spectrum);

  //Changes amount of voxels depending on the frequency #
  ambientLight(spectrum[0]);

  for (let i = 0; i < spectrum.length; i++) {
    if (spectrum[0] == 255) {
      gridSz = 255 / 8;
    } else if (spectrum[0] == 253) {
      gridSz = 253 / 7;
    } else if (spectrum[0] == 251) {
      gridSz = 251 / 6;
    } else if (spectrum[0] == 249) {
      gridSz = 249 / 5;
    } else if (spectrum[0] == 216) {
      gridSz = 216 / 4;
    } else if (spectrum[0] == 180) {
      gridSz = 180 / 3;
    } else if (spectrum[0] == 160) {
      gridSz = 160 / 2;
    } else if (spectrum[0] == 0) {
      gridSz = 180 / 1;
    }
    maxBoxSz = spectrum[0];
    minBoxSz = spectrum[0];
  }

  zTranslate = -boxSz;
  background(0);
  translate(0, 0, zTranslate);
  push();

  //Speed of rotation
  //Increase decimals to make shape spin faster
  rotateY(frameCount  * 0.015);
  rotateZ(spectrum[0] * 0.0012);
  rotateX(frameCount  * 0.015);

  let radius = boxSz - boxSz / 10;


  //Sets up voxels
  for (let x = -boxSz + gridSz; x <= boxSz - gridSz; x += gridSz) {
    for (let y = -boxSz + gridSz; y <= boxSz - gridSz; y += gridSz) {
      for (let z = -boxSz + gridSz; z <= boxSz - gridSz; z += gridSz) {
        let d = dist(0, 0, 0, x, y, z);
        if (d > radius - gridSz && d < radius) {
          push();
          translate(x, y, z);
          normalMaterial();
          box(gridSz);
          pop();
        }
      }
    }
  }
  pop();
}