/* 
Part of the ReCode Project (http://recodeproject.com)
Based on "Untitled 3" by Reiner Schneeberger
Originally published in "Computer Graphics and Art" v3n2, 1978
Copyright (c) 2013 Ervare Farroretre - OSI/MIT license (http://recodeproject/license).
*/


function setup() {
  createCanvas(900, 900);
  strokeWeight(3)
}

function draw() {
  background(255);
    
  let lolX = 12*tan(frameCount*5);
  let lolY = 10*cos(frameCount*0.05);
  push()
  
  // Top left design
  line (155+lolX, 84+lolY, 230+lolX, 84+lolY);
  line (230+lolX, 84+lolY, 230+lolX, 162+lolY);
  line (230+lolX, 162+lolY, 75+lolX, 162+lolY);
  line (75+lolX, 162+lolY, 75+lolX, 320+lolY);
  line (154+lolX, 162+lolY, 154+lolX, 240+lolY);
  //Adjust stroke width
  
  //Twolines at top left
  line (316+lolX, 84+lolY, 316+lolX, 162+lolY);
  line (390+lolX, 84+lolY, 390+lolX, 162+lolY);
  
  line (470+lolX, 20+lolY, 470+lolX, 84+lolY);
  line (470+lolX, 162+lolY, 550+lolX, 162+lolY);
  
  line (705+lolX, 20+lolY, 705+lolX, 84+lolY);
  line (780+lolX, 90+lolY, 815+lolX, 90+lolY);
  
  //top quarter done
  
  
  line (154+lolX, 320+lolY, 230+lolX, 320+lolY);
  line (230+lolX, 320+lolY, 230+lolX, 240+lolY);
  line (230+lolX, 240+lolY, 470+lolX, 240+lolY);
  line (390+lolX, 240+lolY, 390+lolX, 320+lolY);
  line (470+lolX, 240+lolY, 470+lolX, 320)+lolY;

  line (550+lolX, 320+lolY, 700+lolX, 320+lolY);
  line (700+lolX, 320+lolY, 700+lolX, 240+lolY);
  line (700+lolX, 240+lolY, 815+lolX, 240+lolY);
  
  
  line (316+lolX, 320+lolY, 316+lolX, 400+lolY);
  line (230+lolX, 395+lolY, 155+lolX, 395+lolY);
  line (155+lolX, 395+lolY, 155+lolX, 475+lolY);
  line (155+lolX, 475+lolY, 75+lolX, 475+lolY);
  
  line (230+lolY, 475+lolX, 390+lolY, 475+lolX);
  line (390+lolY, 395+lolX, 780+lolY, 395+lolX);
  line (780+lolY, 395+lolX, 780+lolY, 320+lolX);
  line (470+lolY, 395+lolX, 470+lolY, 475+lolX);
  line (620+lolY, 395+lolX, 620+lolY, 640+lolX);
  line (620+lolY, 475+lolX, 540+lolY, 475+lolX);
  
  line (700+lolY, 475+lolX, 775+lolY, 475+lolX);
  line (775+lolY, 475+lolX, 775+lolY, 555+lolX);
  
  line (775+lolY, 640+lolX, 700+lolY, 640+lolX);
  line (460+lolY, 640+lolX, 390+lolY, 640+lolX);
  
  line (230+lolY, 640+lolX, 230+lolY, 550+lolX);
  line (230+lolY, 640+lolX, 150+lolY, 640+lolX);
  line (315+lolY, 550+lolX, 390+lolY, 550+lolX);
  
  line (150+lolY, 550+lolX, 75+lolY, 550+lolX);
  line (75+lolY, 550+lolX, 75+lolY, 640+lolX);
  line (470+lolY, 550+lolX, 540+lolY, 550+lolX);
  line (540+lolY, 550+lolX, 540+lolY, 640+lolX);
  
  line (75+lolY, 710+lolX, 230, 710+lolX);
  line (150+lolY, 710+lolX, 150, 785+lolX);
  line (150+lolY, 785+lolX, 75, 785+lolX);
  line (230+lolY, 710+lolX, 230, 785+lolX);
  
  line (315+lolY, 785+lolX, 465, 785+lolX);
  line (465+lolY, 785+lolX, 465, 710+lolX);
  line (380+lolY, 710+lolX, 315, 710+lolX);
  line (540+lolY, 710+lolX, 810, 710+lolX);
  line (810+lolY, 785+lolX, 700, 785+lolX);
  
  pop()
  
  
  
}