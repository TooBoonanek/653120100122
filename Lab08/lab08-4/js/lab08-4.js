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

    // Function to apply combined transformations
    function applyCombinedTransformations(tx, ty, rotation, scale) {
        ctx.save(); // Save the current state
        ctx.translate(tx, ty); // Apply translation
        ctx.rotate(rotation); // Apply rotation
        ctx.scale(scale, scale); // Apply scaling
        drawRectangle(0, 0); // Draw the rectangle at the new position
        ctx.restore(); // Restore the previous state
    }

    // Initial draw
    drawRectangle(rectX, rectY);

    // Example of applying combined transformations
    setTimeout(function() {
        // Apply translation (100, 50), rotation (45 degrees), and scaling (1.5x)
        applyCombinedTransformations(100, 50, Math.PI / 4, 1.5); // After 2 seconds
    }, 2000);
};