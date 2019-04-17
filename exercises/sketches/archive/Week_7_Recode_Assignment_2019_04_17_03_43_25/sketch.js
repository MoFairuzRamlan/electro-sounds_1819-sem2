let _width = 600;
let _height = 400;
let _size = 20;     // hexagon radius

function setup() {
  
  createCanvas(_width, _height);
  noLoop();
  
  background(255);
  noFill();
  stroke(0);
  strokeWeight(2);

}

function draw() {

  // clear background
  background(255);
  
  // line length (hypotenuse)
  let h = sin(PI/3) * _size;
  
  for (let i = 0; i <= _width / (_size * 3); i++) {
    for (let j = 0; j <= (_height / h) + 1; j++) {

      // reference points (centre of each hexagon)
      let x = i * _size * 3 + (_size / 2);
      let y = j * h;
      // offset each odd row
      if (j % 2 > 0) {
        x += _size * 1.5;
      }

      push();
      
        translate(x, y);
        
        // random hexagon rotation (0, 120, 240 degrees)
        rotate(int(random(0, 3)) * PI/3);
    
        // draw line
        line(0, -h, 0, h);
  
        // draw arcs
        arc(-_size, 0, _size, _size, -PI/3,     PI/3);
        arc( _size, 0, _size, _size,  PI/3 * 2, PI/3 * 4); 
      
      pop();

    }  
  }

}

function mousePressed() {
  
  redraw();

}