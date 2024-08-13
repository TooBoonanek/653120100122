window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Define the center and size of the star
    var centerX = 300;
    var centerY = 200;
    var outerRadius = 100;
    var innerRadius = 50;

    // Function to draw a star
    function drawStar(cx, cy, outerRadius, innerRadius, transformMatrix) {
        var numberOfPoints = 5,
            step = Math.PI / numberOfPoints;

        ctx.beginPath();
        for (var i = 0; i <= 2 * numberOfPoints; i++) {
            var r = (i % 2 === 0) ? outerRadius : innerRadius;
            var x = r * Math.cos(i * step);
            var y = r * Math.sin(i * step);
            var transformedPoint = transformPoint(x, y, transformMatrix);
            if (i === 0) {
                ctx.moveTo(cx + transformedPoint[0], cy + transformedPoint[1]);
            } else {
                ctx.lineTo(cx + transformedPoint[0], cy + transformedPoint[1]);
            }
        }
        ctx.closePath();
        ctx.fillStyle = '#00f'; // Set the fill color to blue
        ctx.fill(); // Fill the star
        ctx.stroke(); // Outline the star
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

    // Create the translation matrix
    var translationMatrix = new Matrix4();
    translationMatrix.setIdentity();
    translationMatrix.translate(100, 100, 0); // Translate by 100 units in x and y

    // Combine the rotation and translation matrices
    var transformMatrix = translationMatrix.multiply(rotationMatrix);

    // Draw the transformed star
    drawStar(centerX, centerY, outerRadius, innerRadius, transformMatrix);
};
