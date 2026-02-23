function setup() {
  createCanvas(1405, 600);
  angleMode(DEGREES);

  noFill();
  strokeWeight(1);

  stroke(255, 230, 0);

}

//scroll integration for interactive artwork 
function mouseWheel(event) {

  //improve scroll consistency on mouse 
  if (event.delta > 5) {
    event.delta = 5;
  }
  count += event.delta * 0.5; // scroll modifies evolution
  return false; // prevents page scroll
}


function polarToCartesianX(r, angle) {
  return r * cos(angle);
}

function polarToCartesianY(r, angle) {
  return - r * sin(angle);
}

let count = 0;


function draw() {

  background(255, 111, 0);

  translate(width / 2, height / 2);


  //draw shape
  beginShape();

  let angle = 0;

  while (angle < 6 * 360) { //number of loops around the centre 

    let radius = 100 * tan(count * 0.001 * angle);

    let x = polarToCartesianX(radius, angle);
    let y = polarToCartesianY(radius, angle);

    //draw a point of the shape
    curveVertex(x, y);

    angle = angle + 1;
  }

  //shape is finished 
  endShape();


}



