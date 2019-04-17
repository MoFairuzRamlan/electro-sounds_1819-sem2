
//This Overlay conjures Star Emmision that reacts to audio
//pertaining to the speed.

function initOverlay9(){
  buffer9 = createGraphics(windowWidth, windowHeight);
  buffer9.background(10);
  for(var i = 0; i < 4001;i++){
      stars[i] = new Star();
  }
}

function drawOverlay9() {

  buffer9.background(0);
  buffer9.push()
  buffer9.translate(width/2,height/2);

  speedstar = map(spectrum[30], 0, 255, 3, 150);
    //points

      for (var i = 0; i < spectrum[0]*2; i++){
          stars[i].display();
          stars[i].update();
      }
      buffer9.pop();
  }



  function Star(){
      this.x = random(-width*2,width*2);
      this.y = random(-height*4,height*4);
      this.z = random(width*2,width*4);
      this.pz = this.z;
      this.px = this.x;
      this.py = this.y;

      this.angle = 0;

      this.display = function(){


          var sx = map(this.x/this.z/2, -1, 1, -width, width);
          var sy = map(this.y/this.z/2, -1, 1, -height, height);

          var r = map(dist(sx,sy,this.px,this.py),0,width*3,3,10);

          var percent = norm(dist(sx,sy,0,0), 0, 400);
          from = color(spectrum[30]/2, 255, spectrum[50]);
          to = color(255, spectrum[30]/2, spectrum[50]);
          between = lerpColor(from, to, percent);

          buffer9.stroke(between);
          buffer9.strokeWeight(r);

          if(this.z >= 1 && sx <= width && sx > -width && sy > -height && sy < height ){
           buffer9.line(this.px,this.py,sx,sy);
           this.px = sx;
           this.py = sy;
       }
   }

   this.update = function(){
      this.z -= speedstar; //speed
      if(this.z < 1){
          this.z = random(width*1.5,width*2);
          this.x = random(-width,width);
          this.y = random(-height*2,height*2);
          this.px = map(this.x/this.z/2, -1, 1, -width, width);
          this.py = map(this.y/this.z/2, -1, 1, -height, height);
      }
  }

  }
