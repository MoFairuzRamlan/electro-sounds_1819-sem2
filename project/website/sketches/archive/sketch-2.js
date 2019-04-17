let s2 = function(p) {

let  num = 380;
var particles_a = [];
var particles_b = [];
var particles_c = [];
let noiseScale = 4000
let noiseStrength = 6;
let mic, fft;
//let r = 1;
p.setup = function() {
  p.createCanvas(800, 400);
	//createCanvas(windowWidth,windowHeight);
  p.noStroke();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 64);
  fft.setInput(mic);

  for (let i=0; i<num; i++) {
    let loc_a = p.createVector(p.random(p.width*1.2), p.random(p.height), 2);
    let angle_a = p.random(p.TWO_PI);
    let dir_a = p.createVector(p.cos(angle_a), p.sin(angle_a));
		let loc_b = p.createVector(p.random(p.width*1.2), p.random(p.height), 2);
    let angle_b = p.random(p.TWO_PI);
    let dir_b = p.createVector(p.cos(angle_b), p.sin(angle_b));
		let loc_c = p.createVector(p.random(p.width*1.2), p.random(p.height), 2);
    let angle_c = p.random(p.TWO_PI);
    let dir_c = p.createVector(p.cos(angle_c), p.sin(angle_c));
    let speed = p.random(0.3, 0.8);
    //particles[i]= new Particle(loc, dir, speed);
		particles_a[i] = new Particle(loc_a, dir_a, speed);
		particles_b[i] = new Particle(loc_b, dir_b, speed);
		particles_c[i] = new Particle(loc_c, dir_c, speed);
  }
}

p.draw = function() {

  //let spectrum = fft.analyze();


	p.smooth();
  //background(255);
  p.fill(0, 6);
  p.noStroke();
  p.rect(0, 0, p.width, p.height);

  for (let i=0; i<num; i++) {
		p.radius = p.map(i,0,num,1,2);
		p.fade = p.map(i,0,num,0,250);

		p.fill(30, p.fade);
		particles_a[i].move();
		particles_a[i].update(p.radius);
		particles_a[i].checkEdges();

		p.fill(70, p.fade);
		particles_b[i].move();
		particles_b[i].update(p.radius);
		particles_b[i].checkEdges();

		p.fill(270, p.fade);
		particles_c[i].move();
		particles_c[i].update(p.radius);
		particles_c[i].checkEdges();
  }
}

let Particle = function(loc_, dir_, speed_) {


  this.loc = loc_;
	this.dir = dir_;
	this.speed = speed_;
	this.d = 1;
	//this.col;
	//this.angle;
	//this.vel;
};

Particle.prototype.run = function() {
	  this.move();
    this.checkEdges();
    this.update();
};

// Method to move position
Particle.prototype.move = function(){
	  this.angle=p.noise(this.loc.x/noiseScale, this.loc.y/noiseScale, p.frameCount/noiseScale)*p.TWO_PI*noiseStrength;
    this.dir.x = p.cos(this.angle)+p.sin(this.angle)-p.sin(this.angle);
    this.dir.y = p.sin(this.angle)-p.cos(this.angle)*p.sin(this.angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed*this.d);
    this.loc.add(this.vel);
};

// Method to chech edges
Particle.prototype.checkEdges = function(){
 if (this.loc.x < 0 || this.loc.x > p.width || this.loc.y < 0 || this.loc.y > p.height) {
      this.loc.x = p.random(p.width*1.2);
      this.loc.y = p.random(p.height);
    }
};


// Method to update position
Particle.prototype.update = function(r){
    p.ellipse(this.loc.x, this.loc.y, r);
};

}

p2 = new p5(s2, 'sketch-2');
