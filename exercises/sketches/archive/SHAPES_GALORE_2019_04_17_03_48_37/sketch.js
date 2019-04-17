// rotation
var objRotateX = 0;
var objRotateY = 0;
var objRotateZ = 0;
var boomboom = 0;

function setup() {
   createCanvas(windowWidth, windowHeight, WEBGL);
  
//frameRate(20);
}

function draw() {
  background(0);
  doAnimate();
  objRotate();
  drawModel();
  
  boomboom = sin(frameCount*0.05);
  
}

function drawModel() {
  var groupRadius = (height/2) - (height/10);
  var sphereCount = 256;
  var sphereMaxR = 6;
  
  // big sphere
  //noFill(); // hmmm, seems like noFill has no effect on 3d yet
  //stroke(255); // hmmm, seems like stroke has no effect on 3d yet
  //basicMaterial(255,255,255);
  //sphere(groupRadius, 20);
  
  // smaller spheres
  normalMaterial(24);
  ambientLight(255);
  
  for (var s=0; s < sphereCount; s++) {
    
    var noiseCoord = s;
    var rnd = lerp(-1,1,noise(noiseCoord));

    
    // translate
    rotateY(PI*rnd);
    rotateZ(PI*rnd);
    translate(groupRadius,0,0); 
    fill(255*tan(frameCount*0.5), 255*sin(frameCount*0.05), 255*sin(frameCount*0.5))
    cone(10,20)
    
    //reset translation
    translate(-groupRadius,0,50*boomboom);  
    rotateY(-(PI*rnd));
    rotateZ(-(PI*rnd));
  }
  

  
}

function doAnimate() {
  // increment animation variables
  objRotateX -= 0.1;
  objRotateY -= 0.1;
  objRotateZ -= 0.1;
}

function objRotate() {
  rotateX(radians(objRotateX));
  rotateY(radians(objRotateY));
  rotateZ(radians(objRotateZ));
}