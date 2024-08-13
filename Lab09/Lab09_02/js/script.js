window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Define the center and size of the pentagon
    var centerX = 300;
    var centerY = 200;
    var size = 100;

    // Function to draw a pentagon
    function drawPentagon(cx, cy, size, transformMatrix) {
        var numberOfSides = 5,
            angle = 2 * Math.PI / numberOfSides;

        ctx.beginPath();
        for (var i = 0; i <= numberOfSides; i++) {
            var x = size * Math.cos(i * angle);
            var y = size * Math.sin(i * angle);
            var transformedPoint = transformPoint(x, y, transformMatrix);
            if (i === 0) {
                ctx.moveTo(cx + transformedPoint[0], cy + transformedPoint[1]);
            } else {
                ctx.lineTo(cx + transformedPoint[0], cy + transformedPoint[1]);
            }
        }
        ctx.closePath();
        ctx.fillStyle = '#00f'; // Set the fill color to blue
        ctx.fill(); // Fill the pentagon
        ctx.stroke(); // Outline the pentagon
    }

    // Function to transform a point using the transformation matrix
    function transformPoint(x, y, matrix) {
        var vec = new Vector3([x, y, 1]);
        var transformedVec = matrix.multiplyVector3(vec);
        return [transformedVec.elements[0], transformedVec.elements[1]];
    }

    // Create the rotation matrix
    var rotationMatrix = new Matrix4();
    rotationMatrix.setIdentity();
    rotationMatrix.rotate(45, 0, 0, 1); // Rotate by 45 degrees around the z-axis

    // Draw the rotated pentagon
    drawPentagon(centerX, centerY, size, rotationMatrix);
};