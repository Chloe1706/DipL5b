
let possibleColours = ["#f63a1f", "#2d2f6a", "#faf07d", "#fafafa", "#fafafa", "#fafafa", "#fafafa", "#140404"];
let possibleSquareWidth = [50, 100, 100, 100, 200, 200, 300];
let possibleSquareHeight = [50, 100, 100, 100, 100, 200, 200];

let mondrianSketch = new p5(function(p) {

    function drawOneRow(y, chosenHeight) {
        let x = 0;
        while (x < p.width) {
            let chosenColour = p.random(possibleColours);
            p.fill(chosenColour);
            let chosenWidth = p.random(possibleSquareWidth);
            if (x + chosenWidth > p.width) {
                chosenWidth = p.width - x;
            }
            p.stroke("#25170c");
            p.strokeWeight(7);
            p.rect(x, y, chosenWidth, chosenHeight);
            x = x + chosenWidth;
        }
    }

    p.setup = function() {
        p.createCanvas(800, 600);
        p.noLoop();
    };

    p.draw = function() {
        p.background(220);
        let y = 0;
        while (y < p.height) {
            let chosenHeight = p.random(possibleSquareHeight);
            if (y + chosenHeight > p.height) {
                chosenHeight = p.height - y;
            }
            drawOneRow(y, chosenHeight);
            y = y + chosenHeight;
        }
        p.noFill();
        p.strokeWeight(20);
        p.rect(0, 0, p.width, p.height);
        p.strokeWeight(7);
    };

}, 'mondrian-canvas');