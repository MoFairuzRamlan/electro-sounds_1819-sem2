//FOR PARTICLES MOVEMENT AND position()

var sketch = function(p) {

  // An array with nodes
  var nodes = [];

  var nodeCount = 200;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();

    // Create nodes
    createNodes();
  };

  p.draw = function() {
    p.fill(255, 20);
    p.rect(0, 0, p.width, p.height);

    p.fill(0);
    for (var i = 0; i < nodes.length; i++) {
      // Let all nodes repel each other
      nodes[i].attractNodes(nodes);
      // Apply velocity vector and update position
      nodes[i].update();
      // Draw node
      p.ellipse(nodes[i].x, nodes[i].y, 10, 10);
    }
  };

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == 'r' || p.key == 'R') {
      p.background(255);
      createNodes();
    }
  };

  function createNodes() {
    nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      nodes.push(new Node(
        p.width / 2 + p.random(-1, 1),
        p.height / 2 + p.random(-1, 1),
        5,
        p.width - 5,
        5,
        p.height - 5
      ));
    }
  }

};
