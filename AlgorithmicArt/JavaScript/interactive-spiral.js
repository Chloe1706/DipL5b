let spiralInView = false;

function setup() {
  let cnv = createCanvas(1405, 600);
  if (document.getElementById('spiral-canvas')) {
    cnv.parent('spiral-canvas');

    const observer = new IntersectionObserver((entries) => {
      spiralInView = entries[0].isIntersecting;
    }, { threshold: 0.9 });

    observer.observe(document.getElementById('spiral-canvas'));
  } else {
    // full-page version — always active
    spiralInView = true;
  }

  angleMode(DEGREES);
  noFill();
  strokeWeight(1);
  stroke(255, 230, 0);
}

function mouseWheel(event) {
  if (!spiralInView) return; // let page scroll pass through

  if (event.delta > 5) {
    event.delta = 5;
  }
  count += event.delta * 0.5;
  return false; // prevents page scroll only when canvas is in view
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

  beginShape();

  let angle = 0;

  while (angle < 6 * 360) {
    let radius = 100 * tan(count * 0.001 * angle);
    let x = polarToCartesianX(radius, angle);
    let y = polarToCartesianY(radius, angle);
    curveVertex(x, y);
    angle = angle + 1;
  }

  endShape();
}