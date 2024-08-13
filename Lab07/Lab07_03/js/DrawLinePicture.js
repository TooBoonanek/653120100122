window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // เติมพื้นหลังสีขาว
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // ฟังก์ชันวาดดาว
    function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        context.beginPath();
        context.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            context.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            context.lineTo(x, y);
            rot += step;
        }
        context.lineTo(cx, cy - outerRadius);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.stroke();
        context.fillStyle = 'yellow';
        context.fill();
    }

    // วาดดาวที่จุดกึ่งกลางของ canvas
    drawStar(400, 300, 5, 100, 50);
};