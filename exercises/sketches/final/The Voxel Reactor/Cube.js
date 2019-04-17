//  This Sketch is to create the Audio-Reactive Voxelized Polygon


//starts up audio analysis

let spectrum = 0;
let level = 0;

//Draws the voxelized polygon
function drawMAIN() {


  analyzer();

  drawStuff();

}

//Draws the Voxelized Polygon
function drawStuff() {

  //Amount of voxels
  // let spectrum = fft.analyze();
  //Gets level of amplitude
  // let level = amplitude.getLevel();
  let level = mic.getLevel();
  sizevol = map(level, 0, 0.3, 0, 600);
  //console.log(level);

  //Size of voxel sphere
  let boxSzadd = map(spectrum[0], 0, 255, 0, 200);
  boxSz = 0 + sizevol + boxSzadd/8;


  //console.log(spectrum[40]);

  //Changes amount of voxels depending on the frequency #
  three.ambientLight(100, 100, 100);

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
    minBoxSz = (spectrum[0]) / 16;
    //boxSz = map(sin(frameCount * 0.025), -1, 1, minBoxSz, maxBoxSz);
  }

  zTranslate = -boxSz;
  //three.background(spectrum[90]-1, spectrum[60]-1, spectrum[30]-1);
  three.background(255, 0);
  three.translate(0, 0, zTranslate);
  three.push();

  //Speed of rotation
  //Increase decimals to make shape spin faster

  three.rotateY(frameCount * 0.015);
  three.rotateZ(spectrum[0] * 0.0012);
  three.rotateX(frameCount * 0.015);


  let radius = boxSz - boxSz / 10;


  //Sets up voxels
  for (let x = -boxSz + gridSz; x <= boxSz - gridSz; x += gridSz) {
    for (let y = -boxSz + gridSz; y <= boxSz - gridSz; y += gridSz) {
      for (let z = -boxSz + gridSz; z <= boxSz - gridSz; z += gridSz) {
        let d = dist(0, 0, 0, x, y, z);
        if (d > radius - gridSz && d < radius) {
          three.push();
          three.translate(x, y, z);
          three.normalMaterial();
          three.box(gridSz);
          three.pop();
        }
      }
    }
  }
  three.pop();
  three.push();
  drawModel();
  doAnimate();
  objRotate();
  three.pop();


  boomboom = sin(frameCount * 0.005);
}

function drawModel() {

  var groupRadius = 2 * ((height / 2) - (height / 10));
  var sphereCount = 256;
  var sphereMaxR = 10;

  // smaller spheres
  three.normalMaterial(32);
  three.ambientLight(60,60,60);

  for (var s = 0; s < sphereCount; s++) {

    var noiseCoord = s;
    var rnd = lerp(-1, 1, noise(noiseCoord));

    //push();
    // translate
    three.rotateY(PI * rnd);
    three.rotateZ(PI * rnd);
    three.translate(groupRadius, 0, 0);
    three.fill(random(255), random(255), random(255))
    three.sphere(rnd * sphereMaxR, 10);

    //reset translation
    three.translate(-groupRadius, 0, 50 * boomboom);
    three.rotateY(-(PI * rnd));
    three.rotateZ(-(PI * rnd));
    //pop();
  }


}

function doAnimate() {
  //increment animation variables
  objRotateX -= 0.1;
  objRotateY -= 0.1;
  objRotateZ -= 0.1;
}

function objRotate() {
  three.rotateX(radians(objRotateX));
  three.rotateY(radians(objRotateY));
  three.rotateZ(radians(objRotateZ));
}
//Function for analysis
function analyzer() {
  spectrum = fft.analyze();
  level = amplitude.getLevel();

  three.push();
  three.stroke(255);
  three.translate(0, 0, zTranslate);
  for (var i = 0; i < spectrum.length; i++) {
    let amp1 = spectrum[i];
    let y4 = map(amp1, 0, 256, windowHeight, 0);
    three.rectMode(CENTER);
    three.rect(i * w, y4, i * w, windowHeight - y4);
  }
  three.pop();
}
