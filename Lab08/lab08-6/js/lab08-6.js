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

  // Function to apply scaling matrix
  function applyScalingMatrix(scaleX, scaleY) {
      ctx.save(); // Save the current state
      ctx.setTransform(scaleX, 0, 0, scaleY, rectX, rectY); // Apply scaling matrix
      drawRectangle(-rectWidth / 2, -rectHeight / 2); // Draw the rectangle centered around the origin
      ctx.restore(); // Restore the previous state
  }

  // Initial draw
  drawRectangle(rectX, rectY);

  // Example of applying scaling matrix
  setTimeout(function() {
      applyScalingMatrix(2, 3); // Scale the rectangle by 1.5x horizontally and 2x vertically after 2 seconds
  }, 2000);
};
