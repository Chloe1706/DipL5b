let bird;

function preload() {
  // load SVG 
  bird = loadImage('../JavaScript/bird.svg'); // escher inspired bird svg
}

function setup() {
  createCanvas(1400, 500);
  noLoop();
}

function draw() {
  background(240);


  const s = 0.25; // scale of bird
  const xSpacing = 325; // distance in pixels between birds horizontally 
  const ySpacing = 260; // distance in pixels between birds vertically 


  // Draw grid starting at top-left canvas corner
  - imageMode(CORNER);
  + imageMode(CENTER);

  //nested while loop that fills the canvas with 'image' (bird SVG)
  let row = 0;

  //outer loop for horizontal birds 
  while (row < 5) {

    //innner loop for vertical birds 
    let col = 0;
    while (col < 5) {
      const x = col * xSpacing;
      const y = row * ySpacing;
      image(bird, x, y, bird.width * s, bird.height * s);
      col++;
    }
    row++;
  }

}