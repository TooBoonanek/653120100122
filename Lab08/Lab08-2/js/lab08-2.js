window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Define initial rectangle properties
    var rectWidth = 100;
    var rectHeight = 50;
    var rectX = 250;  // Initial X position
    var rectY = 150;  // Initial Y position

    // Function to draw the rectangle
    function drawRectangle(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#00f'; // Set the fill color to blue
        ctx.fillRect(x, y, rectWidth, rectHeight); // Draw the rectangle
    }

    // Function to apply a custom transformation matrix
    function applyCustomMatrix(a, b, c, d, e, f) {
        ctx.save(); // Save the current state
        ctx.setTransform(a, b, c, d, e, f); // Apply custom transformation matrix
        drawRectangle(0, 0); // Draw the rectangle at the new position
        ctx.restore(); // Restore the previous state
    }

    // Initial draw
    drawRectangle(rectX, rectY);

    // Example of applying a custom matrix with translation
    setTimeout(function() {
        // Example matrix values for translation: [1, 0, 0, 1, 100, 50]
        applyCustomMatrix(1, 0, 0, 1, 100, 50); // Apply custom matrix after 2 seconds
    }, 2000);
};