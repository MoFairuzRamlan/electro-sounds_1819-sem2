//noprotect
var shadow;
var theata = 0;
var myCanvas;
var img;

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {
    drawParticles();
}


function drawParticles(){
//shadow='rgba(10,10,10,'+(1-0)+')';


background(0);


translate(width/2, height/2);


for (var k = 0; k <1; k++) {
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {

                var ratio = dist(i, j, 0, 0) /10;
                var angle = sin(millis() / 2000 * 10 + ratio * (PI/2));

                var b = (70);

                var scale = map(15,5,50,400,1000);
                var r = map(dist(i * b, j * b, 0, 0), 0, scale,20, 0);



                var percent = norm(pow(j + i, 1.2), 0, 15);

                from = color('#aab91f');
                //to = color('#009788');
                //between = lerpColor(from, to, percent);
       
        
                var x = i * b * abs((cos(angle))/2 );
                var y = j * b * abs((cos(angle))/2 );

                push();
                rotate(radians(theata));

            
                    fill(from);
                    noStroke();
                    ellipse(x, y, r, r);  
                }
             pop();
            }
        }        
         theata+=0.01;        
        rotate(TWO_PI / int(4+0.1));
    
}
