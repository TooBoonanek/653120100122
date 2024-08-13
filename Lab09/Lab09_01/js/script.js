window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Define the center and size of the pentagon
    var centerX = 300;
    var centerY = 200;
    var size = 100;

    // Function to draw a pentagon
    function drawPentagon(cx, cy, size) {
        var numberOfSides = 5,
            angle = 2 * Math.PI / numberOfSides;

        ctx.beginPath();
        for (var i = 0; i <= numberOfSides; i++) {
            var x = cx + size * Math.cos(i * angle);
            var y = cy + size * Math.sin(i * angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = '#00f'; // Set the fill color to blue
        ctx.fill(); // Fill the pentagon
        ctx.stroke(); // Outline the pentagon
    }

    // Draw the pentagon
    drawPentagon(centerX, centerY, size);
};