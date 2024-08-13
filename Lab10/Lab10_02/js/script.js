// DrawnPicture.js

window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 500;

    // เติมพื้นหลังสีขาว
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // ฟังก์ชันวาดจุด
    function drawPoint(cx, cy, radius, color) {
        context.beginPath();
        context.arc(cx, cy, radius, 0, 2 * Math.PI); // (x, y, radius, startAngle, endAngle)
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    // วาดรูปหมี
    function drawBear() {
        // หัว
        drawPoint(300, 250, 50, 'brown'); // หัว

        // หูซ้าย
        drawPoint(250, 200, 30, 'brown'); // หูซ้าย
        drawPoint(250, 200, 20, 'pink'); // หูซ้าย

        // หูขวา
        drawPoint(350, 200, 30, 'brown'); // หูขวา
        drawPoint(350, 200, 20, 'pink'); // หูขวา

        // ตา
        drawPoint(280, 230, 10, 'white'); // ตาซ้าย
        drawPoint(320, 230, 10, 'white'); // ตาขวา
        drawPoint(280, 230, 5, 'black');  // ตาดำซ้าย
        drawPoint(320, 230, 5, 'black');  // ตาดำขวา

        // จมูก
        drawPoint(300, 270, 15, 'black'); // จมูก

        // ปาก
        drawPoint(300, 290, 20, 'red');   // ปาก

        // ร่างกาย
        drawPoint(300, 350, 70, 'brown'); // ร่างกาย

        // แขนซ้าย
        drawPoint(220, 310, 30, 'brown');
        drawPoint(190, 290, 30, 'brown');

        // แขนขวา
        drawPoint(380, 310, 30, 'brown');
        drawPoint(410, 290, 30, 'brown');

        // ขาซ้าย
        drawPoint(210, 430, 30, 'brown');
        drawPoint(360, 410, 30, 'brown');

        // ขาขวา
        drawPoint(400, 430, 30, 'brown');
        drawPoint(250, 410, 30, 'brown');
    }

    drawBear();
};
