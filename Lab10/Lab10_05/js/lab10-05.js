window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // เติมพื้นหลังสีดำ
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // โหลดรูปภาพสำหรับ texture
    const petalTexture = new Image();
    petalTexture.src = './flower.jpg'; // ระบุเส้นทางไปยังไฟล์รูปภาพของคุณ

    // โหลดรูปภาพสำหรับสีเหลือง
    const centerTexture = new Image();
    centerTexture.src = './flower1.jpg'; // ระบุเส้นทางไปยังไฟล์รูปภาพของคุณ

    petalTexture.onload = function() {
        console.log('Petal texture image loaded successfully.');

        centerTexture.onload = function() {
            console.log('Center texture image loaded successfully.');

            // วาดดอกไม้
            function drawFlower(x, y, petalCount, petalRadius, petalColor, centerRadius, centerColor) {
                const angleStep = (Math.PI * 2) / petalCount;

                // สร้าง pattern จาก petal texture
                const petalPattern = context.createPattern(petalTexture, 'repeat');

                // สร้าง pattern จาก center texture
                const centerPattern = context.createPattern(centerTexture, 'repeat');

                // วาดกลีบดอกไม้เป็นวงกลม
                context.fillStyle = petalPattern; // ใช้ pattern เป็นสีพื้นหลังของกลีบดอกไม้
                for (let i = 0; i < petalCount; i++) {
                    const angle = i * angleStep;
                    const petalX = x + Math.cos(angle) * petalRadius;
                    const petalY = y + Math.sin(angle) * petalRadius;
                    
                    context.beginPath();
                    context.arc(petalX, petalY, 30, 0, Math.PI * 2); // วาดกลีบดอกไม้เป็นวงกลม
                    context.fill();
                }

                // วาดกลางดอกไม้
                context.fillStyle = centerPattern; // ใช้ pattern สำหรับกลางดอกไม้
                context.beginPath();
                context.arc(x, y, centerRadius, 0, Math.PI * 2);
                context.fill();
            }

            // เรียกใช้ฟังก์ชันวาดดอกไม้
            drawFlower(400, 300, 15, 100, 'red', 80, 'yellow');
        };

        centerTexture.onerror = function() {
            console.error('Failed to load the center texture image.');
        };
    };

    petalTexture.onerror = function() {
        console.error('Failed to load the petal texture image.');
    };
};
