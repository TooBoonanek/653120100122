window.onload = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // Define initial rectangle properties
  var rectWidth = 100;
  var rectHeight = 50;
  var rectX = 250;  // X position
  var rectY = 150;  // Y position

  // Function to draw the rectangle
  function drawRectangle(x, y) {
      ctx.fillStyle = '#00f'; // Set the fill color to blue
      ctx.fillRect(x, y, rectWidth, rectHeight); // Draw the rectangle
  }

  // Function to apply scaling
  function applyScaling(scaleX, scaleY) {
      ctx.save(); // Save the current state
      ctx.translate(rectX + rectWidth / 2, rectY + rectHeight / 2); // Move to the center of the rectangle
      ctx.scale(scaleX, scaleY); // Apply scaling
      ctx.translate(-rectWidth / 2, -rectHeight / 2); // Move back to the original position
      drawRectangle(0, 0); // Draw the rectangle at the new size
      ctx.restore(); // Restore the previous state
  }

  // Initial draw
  drawRectangle(rectX, rectY);

  // Example of scaling the rectangle
  setTimeout(function() {
      applyScaling(1.5, 2); // Scale the rectangle by 1.5x horizontally and 2x vertically after 2 seconds
  }, 2000);
};