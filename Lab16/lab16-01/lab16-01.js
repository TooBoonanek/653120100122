let scene, camera, renderer, points;

function init() {
    // สร้าง Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // สร้าง Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // สร้าง Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });

    // สร้างจุดสำหรับตัวอักษร T
    const vertices = [
        -1, 1, 0,
        1, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 0.25, 0,   
        0, -1, 0
    ];


    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x000000,
        size: 0.1,
        sizeAttenuation: true
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    // Event listener สำหรับการปรับขนาดจุด
    document.getElementById('pointSize').addEventListener('input', (e) => {
        material.size = parseFloat(e.target.value) / 100;
    });

    // เริ่ม Animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // หมุนจุด
    points.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// รีไซส์ Canvas เมื่อหน้าต่างเปลี่ยนขนาด
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// เริ่มต้นโปรแกรม
init();
