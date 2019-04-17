function initOverlay4() {

  buffer4 = createGraphics(windowWidth, windowHeight);

  for (let i = 0; i < numnoise; i++) {
    let loc_a = buffer4.createVector(random(width * 1.2), random(height), 2);
    let angle_a = random(TWO_PI);
    let dir_a = buffer4.createVector(cos(angle_a), sin(angle_a));
    let loc_b = buffer4.createVector(random(width * 1.2), random(height), 2);
    let angle_b = random(TWO_PI);
    let dir_b = buffer4.createVector(cos(angle_b), sin(angle_b));
    let loc_c = buffer4.createVector(random(width * 1.2), random(height), 2);
    let angle_c = random(TWO_PI);
    let dir_c = buffer4.createVector(cos(angle_c), sin(angle_c));
    let speed = random(0.3, 0.8);
    //particles[i]= new Particle(loc, dir, speed);
    particles_a[i] = new Particle(loc_a, dir_a, speed);
    particles_b[i] = new Particle(loc_b, dir_b, speed);
    particles_c[i] = new Particle(loc_c, dir_c, speed);
  }
}

//Function to Begin Perlin Noise Field
function drawOverlay4() {

  buffer4.smooth();
  buffer4.background(spectrum[100], spectrum[80], spectrum[70], spectrum[40]/8);
  buffer4.fill(0, 6);
  buffer4.noStroke();
  buffer4.rect(0, 0, width, height);

  for (let i = 0; i < numnoise; i++) {
    var radius = map(i, 0, numnoise, 1, 2);
    var fade = map(i, 0, numnoise, 0, 250);

    buffer4.fill(30, fade);
    particles_a[i].move();
    particles_a[i].update(radius);
    particles_a[i].checkEdges();

    buffer4.fill(70, fade);
    particles_b[i].move();
    particles_b[i].update(radius);
    particles_b[i].checkEdges();

    buffer4.fill(270, fade);
    particles_c[i].move();
    particles_c[i].update(radius);
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
Particle.prototype.move = function() {
  this.angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength;
  this.dir.x = cos(this.angle) + sin(this.angle) - sin(this.angle);
  this.dir.y = sin(this.angle) - cos(this.angle) * sin(this.angle);
  this.vel = this.dir.copy();
  this.vel.mult(this.speed * this.d);
  this.loc.add(this.vel);
};

// Method to chech edges
Particle.prototype.checkEdges = function() {
  if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
    this.loc.x = random(width * 1.2);
    this.loc.y = random(height);
  }
};


// Method to update position
Particle.prototype.update = function(r) {
  buffer4.ellipse(this.loc.x, this.loc.y, r);
};
