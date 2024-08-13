window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Set the background color to white
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Define the points to form the letter "T"
    const points = [];

    // Top horizontal bar of T
    for (let x = 150; x <= 350; x += 20) {
        points.push({ x: x, y: 100, color: 'white' });
    }

    // Vertical bar of T
    for (let y = 100; y <= 400; y += 20) {
        points.push({ x: 250, y: y, color: 'white' });
    }

    // Draw each point
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.closePath();
    });
};