window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // เติมพื้นหลังสีดำ
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // ฟังก์ชันวาดธง
    function drawFlag(x, y, width, height) {
        // วาดสามเหลี่ยม (ด้านซ้าย)
        context.beginPath();
        context.moveTo(x - width / 2, y - height / 2); // จุดซ้ายบน
        context.lineTo(x, y); // จุดกลางล่าง
        context.lineTo(x - width / 2, y + height / 2); // จุดซ้ายล่าง
        context.closePath();
        context.fillStyle = 'red'; // สีของสามเหลี่ยม
        context.fill();

        // วาดสามเหลี่ยม (ด้านขวา)
        context.beginPath();
        context.moveTo(x + width / 2, y - height / 2); // จุดขวาบน
        context.lineTo(x, y); // จุดกลางล่าง
        context.lineTo(x + width / 2, y + height / 2); // จุดขวาล่าง
        context.closePath();
        context.fillStyle = 'red'; // สีของสามเหลี่ยม
        context.fill();

        // วาดสามเหลี่ยม (ด้านบน)
        context.beginPath();
        context.moveTo(x - width / 2, y - height / 2); // จุดซ้ายบน
        context.lineTo(x + width / 2, y - height / 2); // จุดขวาบน
        context.lineTo(x, y); // จุดกลางล่าง
        context.closePath();
        context.fillStyle = 'red'; // สีของสามเหลี่ยม
        context.fill();
    }

    // วาดธงที่ตำแหน่ง (400, 300) ขนาด 200x200
    drawFlag(400, 300, 200, 200);
};
