function initOverlay1() {
  buffer = createGraphics(windowWidth, windowHeight);
  var colus = width/textSize();

  for(var i = 0; i<colus;i++){
    stream.push(new Stream(i*textSize()));
  }

}
//Function to Draw Matrix Style

function drawOverlay1() {

  buffer.background(0);
  stream.forEach(function(element){
    element.run();
  });

}

//Stream class
function Stream(x){
  this.max_symbols = floor(random(8,15));
  this.stream = [];
  this.speed = random(8, 15);
  this.ypos = floor(random(-2000,-1000))
  for(var i =0 ;i<this.max_symbols;i++){

    this.stream.push(new Symbol(x,this.ypos-i*2*textSize(),this.speed,(i==0 && random(0,1)>=0.6)?true:false));
  }

  this.run = function(){
    this.stream.forEach(function(element){
      element.run();
    });
  }
}


//Symbol class
function Symbol(x,y,speed,first){
  this.symbol;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.count = round(random(100,200));
  this.first = first;
  this.run = function(){
    this.generateSymbol();
    this.show();
    this.update();
  }

  this.generateSymbol = function(){
    if(frameCount%(this.count) == 0){
      this.symbol = String.fromCharCode(
        0x30A0 + round(random(0,96))
      );
    }

  }

  this.show = function(){
    let fontsize = map(spectrum[0], 0, 255, 0, 20);
    buffer.textSize(fontsize);
    if(this.first){
      buffer.fill(spectrum[10],spectrum[0],0);
    }else{
        buffer.fill(spectrum[20],spectrum[30],0,150);
    }

    if(this.symbol!=null){
        buffer.text(this.symbol, this.x, this.y);
    }

  }
  this.update = function(){
    this.y += this.speed;
    if(this.y > height){
      this.y = 0;
    }
  }
}
