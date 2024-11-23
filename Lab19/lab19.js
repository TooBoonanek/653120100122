window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // Fill background with light blue
    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw mountain with shadow
    function drawMountain(x, y, width, height, color) {
        context.beginPath();
        context.moveTo(x, y); // Top of the mountain
        context.lineTo(x - width / 2, y + height); // Bottom left
        context.lineTo(x + width / 2, y + height); // Bottom right
        context.closePath();
        
        // Add shadow
        context.shadowColor = 'rgba(0, 0, 0, 0.3)';
        context.shadowBlur = 20;
        context.shadowOffsetX = 10;
        context.shadowOffsetY = 10;
        
        context.fillStyle = color;
        context.fill();
        
        // Reset shadow for the stroke
        context.shadowColor = 'transparent';
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        context.stroke();
    }

    // Draw sun with gradient
    function drawSun(x, y, radius) {
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'yellow');
        gradient.addColorStop(1, 'orange');

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
    }

    // Draw sun rays with shadow
    function drawSunRays(x, y, length, count) {
        context.strokeStyle = 'orange';
        context.lineWidth = 2;
        context.shadowColor = 'rgba(255, 165, 0, 0.5)';
        context.shadowBlur = 5;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2) / count * i;
            const xEnd = x + Math.cos(angle) * length;
            const yEnd = y + Math.sin(angle) * length;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(xEnd, yEnd);
            context.stroke();
        }

        // Reset shadow
        context.shadowColor = 'transparent';
    }

    // Draw mountains
    drawMountain(400, 300, 400, 300, '#228B22'); // Forest green
    drawMountain(200, 350, 300, 250, '#32CD32'); // Lime green
    drawMountain(600, 350, 300, 250, '#3CB371'); // Medium sea green

    // Draw sun
    drawSun(400, 250, 50);

    // Draw sun rays
    drawSunRays(400, 250, 70, 20);
};