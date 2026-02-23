function setup() {
    createCanvas(1400, 500);
    background(254, 221, 0); // yellow background

    let y = 0;
    let spacing = 50;

    // Outer loop for vertical rows
    while (y <= height) {
        let x = 0;

        // Inner loop for horizontal dots
        while (x <= width) {
            push(); // isolate style + transform

            // random positioning for organic placement
            translate(x + random(-5, 5), y + random(-5, 5));

            // black main dot
            fill(0);
            noStroke();
            circle(0, 0, 40);

            // inner yellow dot (stays centered)
            fill(254, 221, 0);
            circle(0, 0, 15);

            pop(); // restore style

            x += spacing;
        }

        y += spacing;
    }
}
