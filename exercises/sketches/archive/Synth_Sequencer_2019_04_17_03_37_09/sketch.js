var x = 0;
var y = 0;
var colCount = 16;
var rowCount = 24;
var xSize = 0;
var ySize = 0;
var cells = [];
var playing = false;
var erasing = false;
var playHead = new PlayHead();
var voices = Array(rowCount).fill().map(()=>{return{}});

function setup(){
  pixelDensity(1);
	createCanvas(windowWidth, windowHeight);
	background(0);
	noFill();
	xSize = windowWidth / colCount;
	ySize = windowHeight / rowCount;
	voices.map(v=>{
		v.used = false;
		v.env = new p5.Env();
		v.env.setADSR(0.004, random()/10, 0, 0);
		v.env.setRange(0.3,0);
		v.osc = new p5.Oscillator();
		v.osc.setType(r(['sine', 'square', 'sawtooth', 'triangle']));
		v.osc.start();
		v.osc.amp(v.env);
	});
	for (var y = 0; y<rowCount; y++) {
		for (var x = 0; x<colCount; x++) {
			cells.push(new Cell(x,y))	
		}
	}
	strokeWeight(5);
	randSeq();
	togglePlaying();
}

function draw(){
	cells.map(c=>c.draw());
	playHead.update();
	playHead.draw();

	fill(255);
	text("Press space bar to start/stop.  Press r to randomize.  Press c to clear.", 20, height - 5);
}

//////////////////////////////////////////////////////////////////
//models
//////////////////////////////////////////////////////////////////
function PlayHead(){
	this.startCol = 0;
	this.endCol = colCount;//TODO make playhead loop points
	this.x = x;
	this.colCells;
	this.update = function(){
		if(playing){ 
			this.x = (this.x + 10) % windowWidth; 

			//determine if we are on a new column
			var colCellsNow = cells.filter(c=>c.inX(this.x));
			if(!this.colCells || this.colCells[0].x != colCellsNow[0].x){

				voices.map(v=>v.used=false);
				colCellsNow.map(c=>{
					if(c.on){ c.trigger(); }
				});
				this.colCells = colCellsNow;
			}
		}
	};
	this.draw = function(){
		stroke(0,0,255,100);
		line(this.x, 0, this.x, windowHeight);
	};
}

function Cell(x,y){
	this.x = x;
	this.y = y;
	this.f = midiToFreq(48+(rowCount-this.y-1));
	this.trigger = function(){
		var v = voices[y];//.find(v=>!v.used);
		if(v){
			v.osc.freq(this.f);
			v.env.play();
			v.used = true;
		}

	};
	this.draw = function(){
		stroke(100,100,100 ,100);
		this.on ? fill(255) : fill(0);
		rect(this.x*xSize,this.y*ySize,xSize,ySize)
		var shape = voices[this.y].osc.getType();
		if(shape=="sine"){
			stroke(0,255,0,100)
			bezier((this.x*xSize)+(xSize/2)-10,
				   (this.y*ySize)+(ySize/2),
				   (this.x*xSize)+(xSize/2)-5,
				   (this.y*ySize)+(ySize/2)-20,
				   (this.x*xSize)+(xSize/2)+5,
				   (this.y*ySize)+(ySize/2)+20,
				   (this.x*xSize)+(xSize/2)+10,
				   (this.y*ySize)+(ySize/2))
		} else if(shape=="square"){
			stroke(255,255,0,100)
			line((this.x*xSize)+(xSize/2)-10,
				 (this.y*ySize)+(ySize/2)-10,
			     (this.x*xSize)+(xSize/2)-10,
				 (this.y*ySize)+(ySize/2)+10)
			line((this.x*xSize)+(xSize/2)-10,
				 (this.y*ySize)+(ySize/2)-10,
			     (this.x*xSize)+(xSize/2)+10,
				 (this.y*ySize)+(ySize/2)-10)
			line((this.x*xSize)+(xSize/2)+10,
				 (this.y*ySize)+(ySize/2)-10,
			     (this.x*xSize)+(xSize/2)+10,
				 (this.y*ySize)+(ySize/2)+10)
		} else if(shape=="sawtooth"){
			stroke(255,0,255,100)
			line((this.x*xSize)+(xSize/2)-10,
				 (this.y*ySize)+(ySize/2)-10,
			     (this.x*xSize)+(xSize/2)-10,
				 (this.y*ySize)+(ySize/2)+10)
			line((this.x*xSize)+(xSize/2)-10,
				 (this.y*ySize)+(ySize/2)-10,
			     (this.x*xSize)+(xSize/2)+10,
				 (this.y*ySize)+(ySize/2)+10)
		} else if(shape=="triangle"){
			stroke(0,0,255,100)
			line((this.x*xSize)+(xSize/2)-10,
				 (this.y*ySize)+(ySize/2)+10,
			     (this.x*xSize)+(xSize/2),
				 (this.y*ySize)+(ySize/2)-10)
			line((this.x*xSize)+(xSize/2),
				 (this.y*ySize)+(ySize/2)-10,
			     (this.x*xSize)+(xSize/2)+10,
				 (this.y*ySize)+(ySize/2)+10)
		}
	};
	this.in = function(x,y){ return this.inX(x) && this.inY(y); };
	this.inX = function(x){ return x>=(this.x*xSize) && x<=(this.x*xSize+xSize); };
	this.inY = function(y){ return y>=(this.y*ySize) && y<=(this.y*ySize+ySize); };
	this.on = false;
}

function randSeq(){
	shuffle(voices,true);
	cells.map(c=>c.on=false);
	var xValsUsed = [];
	cells.map(c=>{
		if(xValsUsed.indexOf(c.x) === -1){
			c.on=random()<0.05;r
			if(c.on){
				xValsUsed.push(c.x)
			}
		}
	});
}

function togglePlaying(){
	playing = !playing;
	if(!playing){
		playHead.x = 0;
		voices.map(v=>{v.used=false; delete v.x;});
		cells.map(c=>{c.triggered=false;});
	}
}

//////////////////////////////////////////////////////////////////
//events
//////////////////////////////////////////////////////////////////
function keyTyped() {
	if (key === ' ') {
		togglePlaying();
	} else if(key === 'c'){
		cells.map(c=>c.on=false);

	} else if(key === 'r'){
		randSeq();
	}
}
function mousePressed(){
	erasing = !!cells.find(c=>{
		if(c.in(winMouseX,winMouseY)){ return c.on; }
	});	
}

function mouseDragged(){
	cells.map(c=>{
		if(c.in(winMouseX,winMouseY)){ c.on = !erasing; }
	});
}

function mouseReleased(){
	cells.map(c=>{
		if(c.in(winMouseX,winMouseY)){ c.on = !erasing; }
	});
}

//////////////////////////////////////////////////////////////////
//utils
//////////////////////////////////////////////////////////////////
function r(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function n(){ return random(sz); }
function s(n){ return sin(frameCount * n / 5)*sz; }
