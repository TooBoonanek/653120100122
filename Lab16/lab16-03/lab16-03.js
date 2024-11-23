let scene, camera, renderer, pyramid;

function init() {
    // สร้าง Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    // สร้าง Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // สร้าง Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });

    // สร้าง Pyramid
    const geometry = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
    });
    pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    // เพิ่มแสง
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    // Event listener สำหรับการปรับค่า Alpha
    const alphaSlider = document.getElementById('alphaValue');
    const alphaDisplay = document.getElementById('alphaDisplay');
    alphaSlider.addEventListener('input', (e) => {
        const alpha = parseFloat(e.target.value);
        pyramid.material.opacity = alpha;
        alphaDisplay.textContent = alpha.toFixed(2);
    });

    // เริ่ม Animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // หมุน Pyramid
    pyramid.rotation.x += 0.01;
    pyramid.rotation.y += 0.01;

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