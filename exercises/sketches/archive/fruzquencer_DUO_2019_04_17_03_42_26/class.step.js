class Step {

  constructor(theId, theX, theY) {
    this.id = theId;
    this.x = theX;
    this.y = theY;
    this.w = 20;
    this.h = 100;
    this.active = true;
    this.col = color(255);
  }

  click() {
    if (this.inside(mouseX, mouseY)) {
      this.active = !this.active;

      if (this.active === true) {
        this.col = color(255);
      } else {
        this.col = color(0);
      }
    }
  }

  update() {
    if (this.active === true) {
      triggerSound(this.id);
      this.col = color(0, 255, 128)
    } 
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(this.col);
    rect(0, 0, this.w, this.h);
    pop();
  }

  inside(theX, theY) {
    let result = theX > this.x &&
      theX < this.x + this.w &&
      theY > this.y &&
      theY < this.y + this.h;
    return result;
  }

}