// Speed is determined by FFT anlaysis
let s1 = function(p) {
  

var shadow;
var theata = 0;
var myCanvas;
var stars = [];
var speedstar=1
var mic, fft;

p.setup = function() {
    myCanvas = p.createCanvas(800, 400);
    p.background(10);
    for(var i = 0; i < 4001;i++){
        stars[i] = new Star();
    }

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 64);
  fft.setInput(mic);

}

p.draw = function() {

         p.background(0);
         p.translate(p.width/2,p.height/2);

  let spectrum = fft.analyze();
  speedstar = p.map(spectrum[30], 0, 255, 3, 150);
  //points

    for (var i = 0; i < spectrum[0]*2; i++){
        stars[i].display();
        stars[i].update();
    }
}



function Star(){
    this.x = p.random(-p.width*2,p.width*2);
    this.y = p.random(-p.height*4,p.height*4);
    this.z = p.random(p.width*2,p.width*4);
    this.pz = this.z;
    this.px = this.x;
    this.py = this.y;

    this.angle = 0;

    this.display = function(){
      let spectrum = fft.analyze();

        var sx = p.map(this.x/this.z/2, -1, 1, -p.width, p.width);
        var sy = p.map(this.y/this.z/2, -1, 1, -p.height, p.height);

        var r = p.map(p.dist(sx,sy,this.px,this.py),0,p.width*3,3,10);

        var percent = p.norm(p.dist(sx,sy,0,0), 0, 400);
        from = p.color(50+spectrum[30]/2, 255, 20+spectrum[50]);
        to = p.color(255, 50+spectrum[30]/2, 50+spectrum[50]);
        between = p.lerpColor(from, to, percent);

        p.stroke(between);
        p.strokeWeight(r);

        if(this.z >= 1 && sx <= p.width && sx > -p.width && sy > -p.height && sy < p.height ){
         p.line(this.px,this.py,sx,sy);
         this.px = sx;
         this.py = sy;
     }
 }

 this.update = function(){
    this.z -= speedstar //speed
    if(this.z < 1){
        this.z = p.random(p.width*1.5,p.width*2);
        this.x = p.random(-p.width,p.width);
        this.y = p.random(-p.height*2,p.height*2);
        this.px = p.map(this.x/this.z/2, -1, 1, -p.width, p.width);
        this.py = p.map(this.y/this.z/2, -1, 1, -p.height, p.height);
    }
}

}
}

p1 = new p5(s1, 'sketch-1');
