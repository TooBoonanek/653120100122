window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // เติมพื้นหลังสีดำ
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // โหลดรูปภาพสำหรับ texture
    const fishTexture = new Image();
    fishTexture.src = './underwater.jpg'; // ระบุเส้นทางไปยังไฟล์รูปภาพของคุณ

    fishTexture.onload = function() {
        console.log('Texture image loaded successfully.');

        // วาดปลา
        function drawFish(x, y, bodyWidth, bodyHeight, tailWidth, tailHeight) {
            // สร้าง pattern จาก texture
            const pattern = context.createPattern(fishTexture, 'repeat');
            
            // วาดลำตัวปลา
            context.fillStyle = pattern;
            context.beginPath();
            context.ellipse(x, y, bodyWidth, bodyHeight, 0, 0, Math.PI * 2);
            context.fill();

            // วาดหางปลา
            context.beginPath();
            context.moveTo(x + bodyWidth, y);
            context.lineTo(x + bodyWidth + tailWidth, y - tailHeight);
            context.lineTo(x + bodyWidth + tailWidth, y + tailHeight);
            context.closePath();
            context.fill();
        }

        // เรียกใช้ฟังก์ชันวาดปลา
        drawFish(400, 300, 100, 50, 50, 30);
    };

    fishTexture.onerror = function() {
        console.error('Failed to load the texture image.');
    };
};
