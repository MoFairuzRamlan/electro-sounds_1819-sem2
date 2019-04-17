let s3 = function(p) {

p.stream = [];

p.setup = function() {

  p.createCanvas(800,400);
  p.cols = p.width/p.textSize();

  for(var i = 0; i<p.cols;i++){
    p.stream.push(new p.Stream(i*p.textSize()));
  }


}

// draw loop
p.draw = function() {

  p.background(0);
  p.stream.forEach(function(element){
    element.run();
  });

}

//Stream class
p.Stream = function(x){
  this.max_symbols = p.floor(p.random(8,15));
  this.stream = [];
  this.speed = p.random(8,15);
  this.ypos = p.floor(p.random(-2000,-1000))
  for(var i =0 ;i<this.max_symbols;i++){

    this.stream.push(new p.Symbol(x,this.ypos-i*2*p.textSize(),this.speed,(i==0 && p.random(0,1)>=0.6)?true:false));
  }

  this.run = function(){
    this.stream.forEach(function(element){
      element.run();
    });
  }
}


//Symbol class
p.Symbol=function(x,y,speed,first){
  this.symbol;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.count = p.round(p.random(100,200));
  this.first = first;
  this.run = function(){
    this.generateSymbol();
    this.show();
    this.update();
  }

  this.generateSymbol = function(){
    if(p.frameCount%(this.count) == 0){
      this.symbol = String.fromCharCode(
        0x30A0 + p.round(p.random(0,96))
      );
    }

  }

  this.show = function(){
    p.textSize(20);
    if(this.first){
      p.fill(255,255,0);
    }else{
        p.fill(255,255,55,150);
    }

    if(this.symbol!=null){
        p.text(this.symbol, this.x, this.y);
    }

  }
  this.update = function(){
    this.y += this.speed;
    if(this.y > p.height){
      this.y = 0;
    }
  }
}

}
p3 = new p5(s3, 'sketch-3');
