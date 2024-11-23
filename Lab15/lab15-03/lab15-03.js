let scene, camera, renderer, pyramid, fog;

function init() {
    // สร้าง Scene
    scene = new THREE.Scene();

    // สร้าง Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // สร้าง Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });

    // สร้าง Pyramid
    const geometry = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    // เพิ่มแสง
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    // เพิ่ม Fog
    fog = new THREE.FogExp2(0xcccccc, 0.01);
    scene.fog = fog;

    // Event listener สำหรับการปรับ fog density
    document.getElementById('fogDensity').addEventListener('input', (e) => {
        fog.density = parseFloat(e.target.value);
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