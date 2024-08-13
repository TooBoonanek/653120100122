// DrawnPicture.js

window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // เติมพื้นหลังสีฟ้าอ่อน
    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // วาดภูเขา (สามเหลี่ยม) ด้วยการไล่ระดับสี
    function drawGradientMountain(x, y, width, height) {
        const gradient = context.createLinearGradient(x - width / 2, y + height, x + width / 2, y);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'lightgreen');

        context.beginPath();
        context.moveTo(x, y); // จุดบนยอดภูเขา
        context.lineTo(x - width / 2, y + height); // จุดซ้ายล่าง
        context.lineTo(x + width / 2, y + height); // จุดขวาล่าง
        context.closePath();
        context.fillStyle = gradient;
        context.fill();
        context.stroke();
    }

    // วาดพระอาทิตย์ (จุด) ด้วยการไล่ระดับสี
    function drawGradientSun(x, y, radius) {
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'yellow');
        gradient.addColorStop(1, 'orange');

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
        context.stroke();
    }

    // วาดลำแสง (เส้นตรง)
    function drawSunRays(x, y, length, count) {
        context.strokeStyle = 'orange';
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2) / count * i;
            const xEnd = x + Math.cos(angle) * length;
            const yEnd = y + Math.sin(angle) * length;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(xEnd, yEnd);
            context.stroke();
        }
    }

    // วาดภูเขาหลักสามยอด
    drawGradientMountain(400, 300, 400, 300);
    drawGradientMountain(200, 350, 300, 250);
    drawGradientMountain(600, 350, 300, 250);

    // วาดพระอาทิตย์ขึ้นที่ด้านหลังภูเขา
    drawGradientSun(400, 250, 50);

    // วาดลำแสงพระอาทิตย์
    drawSunRays(400, 250, 70, 20);
};
