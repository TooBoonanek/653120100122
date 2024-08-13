window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    // กำหนดขนาดของ canvas
    canvas.width = 1000;
    canvas.height = 500;

    // เติมพื้นหลังสีขาว
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // กำหนดตำแหน่งของจุด
    const points = [
        { x: 100, y: 100 },
        { x: 200, y: 150 },
        { x: 300, y: 200 },
        { x: 400, y: 250 },
        { x: 500, y: 300 }
    ];

    // วาดจุด
    context.fillStyle = 'white';
    points.forEach(point => {
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        context.fill();
    });
}
