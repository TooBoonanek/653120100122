window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Set the background color to white
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Define the points and their colors
    const points = [
        { x: 50, y: 50, color: 'red' },
        { x: 150, y: 150, color: 'green' },
        { x: 250, y: 250, color: 'blue' },
        { x: 350, y: 350, color: 'orange' },
        { x: 450, y: 450, color: 'purple' },
    ];

    // Draw each point
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.closePath();
    });
};

