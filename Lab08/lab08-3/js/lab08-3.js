window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Define initial rectangle properties
    var rectWidth = 100;
    var rectHeight = 50;
    var rectX = 250;  // Initial X position
    var rectY = 150;  // Initial Y position
    var angle = 0;    // Initial angle in radians

    // Function to draw the rectangle
    function drawRectangle(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#00f'; // Set the fill color to blue
        ctx.fillRect(x, y, rectWidth, rectHeight); // Draw the rectangle
    }

    // Function to apply rotation
    function applyRotation(degrees) {
        var radians = degrees * Math.PI / 180; // Convert degrees to radians
        ctx.save(); // Save the current state
        ctx.translate(rectX + rectWidth / 2, rectY + rectHeight / 2); // Move to the center of the rectangle
        ctx.rotate(radians); // Rotate by the specified angle
        ctx.translate(-rectWidth / 2, -rectHeight / 2); // Move back to the original position
        drawRectangle(0, 0); // Draw the rectangle
        ctx.restore(); // Restore the previous state
    }

    // Initial draw
    drawRectangle(rectX, rectY);

    // Example of rotating the rectangle
    setTimeout(function() {
        applyRotation(45); // Rotate the rectangle by 45 degrees after 2 seconds
    }, 2000);
};