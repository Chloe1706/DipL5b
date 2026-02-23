function setup() {
  createCanvas(600, 600);
  background(255);

  stroke(0);
  noFill();

  //define the value of 'sw' (stroke weight)
  let sw = 10;
  strokeWeight(sw);

  //define the value of 'inset'
  let inset = sw / 2;

  //define the value of 'half'
  let half = width / 2;

  // Outer border
  rect(inset, inset, width - sw, height - sw);

  //vertical division
  line(half, 0, half, height);

  //horizontal division 
  line(0, half, width, half);


  //define the value of 'spacing' (gab between lines) 
  let spacing = 20;

  //defining a border clearence to create even spacing between   the edge of the border the the parallel lines 
  let clearance = spacing / 2;


  //---- top left quadrant: ----

  //defining the left and right boundaries  
  let leftBound = inset + clearance;
  let rightBound = half - clearance;

  //the horizontal space inside the quadrant where vertical       lines can be drawn:
  let usableWidth = rightBound - leftBound;

  //calculate the centering offset where the lines are shifted   to the right to appear horizontally centred 
  let offsetL = (usableWidth % spacing) / 2;

  //calculate the starting position to ensure that the lines     start at a position that will produce even gaps on both         sides.
  let startX = leftBound + offsetL;

  // while loop for vertical lines (top left)
  let x = startX;
  while (x <= rightBound) {
    line(x, inset, x, half);
    x += spacing;
  }


  //---- top right quadrant: ----

  //defining the top and bottom boundaries 
  let topBound = inset + clearance;
  let bottomBound = half - clearance;

  //the vertical width inside the quadrant where lines can be     drawn
  let usableHeight = bottomBound - topBound;

  //calculate the centering offset where the lines are shifted   downward to appear virtically centred 
  let offsetR = (usableHeight % spacing) / 2;

  //calculate the starting point to create a centred outcome 
  let startY = topBound + offsetR;

  // while loop for horizontal lines (top right)
  let y = startY;
  while (y <= bottomBound) {
    line(half, y, width - inset, y);
    y += spacing;
  }


  //---- bottom left quadrant: ----

  //defining the boundaries of the bottom, left quadrant
  let leftBL = inset;
  let rightBL = half;
  let topBL = half;
  let bottomBL = height - inset;

  //enable a clipping and new spacing rule temporarily
  push()

  // increased spacing for diagonal lines in the bottom left     quadrant 
  let spacingBL = 25;

  //define clipping region 
  clip(() => {
    rect(leftBL, topBL, rightBL - leftBL, bottomBL - topBL);
  });

  // while loop for diagonal lines (bottom left)
  let dlBL = -height; //diagonal lines, bottom left = -600
  while (dlBL <= width) {
    line(
      dlBL + (rightBL - leftBL), topBL,
      dlBL, bottomBL
    );
    dlBL += spacingBL;
  }


  //restore the code prior to the clipping rule
  pop();


  //---- bottom right quadrant: ----

  //defining the boundaries of the bottom, right quadrant
  let leftBR = half;
  let rightBR = width - inset;
  let topBR = half;
  let bottomBR = height - inset;

  //enabling new rules temorarily 
  push();

  //increased spacing value for diagonal lines in the bottom     right quadrant 
  let spacingBR = 25;

  clip(() => {
    rect(leftBR, topBR, rightBR - leftBR, bottomBR - topBR);
  });

  // while loop for diagonal lines (bottom right)
  let dlBR = -height;
  while (dlBR <= width) {
    line(
      dlBR, topBR,
      dlBR + (bottomBR - topBR), bottomBR
    );
    dlBR += spacingBR;
  }

  pop();
}