
let cls, rws;
        let sc = 50;
        let width = 900;
        let height = 600;
        let terrain = [];
        let flying = 0;
        let terrainR = -100;
        let glow = 0;
        let glowRate = 1;
        let camZ = -300;
        let mic;
        function sunBG() {
            //sun
            ambientLight(250,5);
            translate(0,1050,-3000);
            directionalLight(255,255,255,0,0,-2000);
            camera(mouseX,mouseY,camZ);
            rotateX(frameCount * 0.02);
            rotateY(frameCount * 0.01);
            rotateZ(frameCount * 0.01);
            specularMaterial(250,60-glow/2);
            sphere(500+glow/2);
            specularMaterial(250,250,0,90+glow/3);
            sphere(400-glow/3);
            specularMaterial(250,250,0,100+glow/2);
            sphere(300-glow/2);
            specularMaterial(250);
            sphere(100);
            resetMatrix();
            // translate(0,750,-2000);
            // camera(mouseX,mouseY,camZ);
        }

let empty;
        function setup () {
            if(width > 900){
                width = 900;
            }
            if(height > 500){
                height = 500;
            }
            cls = width*2 / sc;
            rws = height*2 / sc;
            for(let x = 0; x < cls; x++) {
                terrain[x] = [];
                for(let y = 0; y < rws - 1; y++) {
                    terrain[x][y] = 0; //specify default value for now.
                }
            }
            angleMode(DEGREES);
            mic = new p5.AudioIn();
            mic.start();
            createCanvas(width,height,WEBGL);
            noFill();
            strokeWeight(0.25)
            stroke(250,50);
            fill(0,150);
            // fill(255);
            noStroke();
          
            empty = createGraphics(10,10);
            empty.background(0,255,0);
          
        }
        function draw () {
            micLevel = mic.getLevel();
            volumeMap = map(micLevel,0, 0.001, 1, 250);
            terrainR += 1;
            flying -= 0.0551;
            var yoff = flying;
            for (var y = 0; y < rws; y++) {
                var xoff = 0;
                for (var x = 0; x < cls; x++) {
                    terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
                    xoff += 0.2;
                }
                yoff += 0.02;
            }
            glow = + random(0+volumeMap/900);
            background(210,10,255);
            // translate(width/2,height/2);
            fill(200,0,200,100);
            rect(-width,-120,width*2,height);
            fill(150,150,250,100);
            rect(-width,0,width*2,height);
            fill(250,250,250,50);
            rect(-width,20,width*2,height);
            fill(250,250,250,50);
            rect(-width,50,width*2,height);
            fill(250,250,250,50);
            rect(-width,70,width*2,height);
            push();
            translate(0,-height*0.9,-2000);
            // pointLight(255,255,255,2,0,0,-2000);
            // camera(mouseX,mouseY,camZ);
            rotateX(frameCount * 0.02);
            rotateY(frameCount * 0.01);
            rotateZ(frameCount * 0.01);
            specularMaterial(250,60-glow/2);
            sphere(500+glow/2);
            specularMaterial(250,250,0,90+glow/3);
            sphere(400-glow/3);
            specularMaterial(250,250,0,100+glow/2);
            sphere(300-glow/2);
            // specularMaterial(250);
            sphere(100);
            resetMatrix();
            pop();
            push();
            rotateX(80);
            translate(-width,-450,-10);
          
            texture(empty);
            let step = 2;
            for(let y = 0; y < rws; y+=step) {
                // pointLight(100,0,200,0,y,200);
                //fill(100,0,200,190);
                // stroke(255,100);
                beginShape(TRIANGLE_STRIP);
                for(let x = 0; x < cls; x+=step) {
                    // camera(0.0)
                    // vertex(x*sc, y*sc,terrain[x][y]);
                    // vertex(x*sc, (y+1)*sc, terrain[x][y+1]);
                    pointLight(255,10,x,y,2000);
                    specularMaterial(255,255,255);
                    vertex(x*sc, y*sc, terrain[x][y] + random(0+volumeMap/400));
                    vertex(x*sc, (y+1)*sc, (terrain[x][y+1]) + random(0+volumeMap/500));
                    
                }
                endShape();
                // sunBG();
            }
        }