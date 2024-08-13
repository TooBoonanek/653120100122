// DrawnPicture.js

window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // เติมพื้นหลังสีฟ้าอ่อน
    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // ฟังก์ชันวาดจุด
    function drawPoint(cx, cy, radius, color) {
        context.beginPath();
        context.arc(cx, cy, radius, 0, 2 * Math.PI); // (x, y, radius, startAngle, endAngle)
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    // ฟังก์ชันวาดคลื่นทะเล
    function drawWave() {
        const waveHeight = 100;
        const waveLength = 40;
        const colors = ['#0077ff', '#00aaff', '#3399ff', '#66c2ff'];
        
        for (let x = 0; x < canvas.width; x += 20) {
            let y = canvas.height - (waveHeight * Math.sin(x / waveLength)) - 50;
            let radius = Math.abs(waveHeight * Math.sin(x / waveLength)) / 2 + 5;
            let color = colors[Math.floor(Math.random() * colors.length)];
            
            drawPoint(x, y, radius, color);
        }
    }

    drawWave();
};
