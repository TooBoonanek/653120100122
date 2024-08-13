window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Define ball properties
    var ball = {
        x: 300, // Initial X position
        y: 200, // Initial Y position
        radius: 20, // Ball radius
        dx: 2, // X velocity
        dy: 2 // Y velocity
    };

    // Function to draw the ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue'; // Set ball color
        ctx.fill();
        ctx.closePath();
    }

    // Function to update ball position
    function updateBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Check for collision with walls
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx; // Reverse direction
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy; // Reverse direction
        }
    }

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Function to animate the ball
    function animate() {
        clearCanvas();
        drawBall();
        updateBall();
        requestAnimationFrame(animate); // Request the next frame
    }

    // Start the animation
    animate();
};
