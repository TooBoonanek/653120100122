window.onload = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // Define initial rectangle properties
  var rectWidth = 100;
  var rectHeight = 50;
  var rectX = 220;  // Initial X position
  var rectY = 120;  // Initial Y position

  // Function to draw the rectangle
  function drawRectangle(x, y) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.fillStyle = '#00f'; // Set the fill color to blue
      ctx.fillRect(x, y, rectWidth, rectHeight); // Draw the rectangle
  }

  // Function to perform translation
  function translateRectangle(dx, dy) {
      rectX += dx;
      rectY += dy;
      drawRectangle(rectX, rectY);
  }

  // Initial draw
  drawRectangle(rectX, rectY);

  // Example of translation
  setTimeout(function() {
      translateRectangle(100, 100); // Translate rectangle after 2 seconds
  }, 2000);
};