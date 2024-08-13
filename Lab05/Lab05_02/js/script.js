window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    // กำหนดตำแหน่งและขนาดของจุด
    const points = [
        { x: 100, y: 100, size: 5 },
        { x: 200, y: 150, size: 10 },
        { x: 300, y: 200, size: 15 },
        { x: 400, y: 250, size: 20 },
        { x: 500, y: 300, size: 25 }
    ];

    canvas.width = 1000;
    canvas.height = 500;

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // วาดจุด
    context.fillStyle = 'white';
    points.forEach(point => {
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, 2 * Math.PI);
        context.fill();
    });
}
