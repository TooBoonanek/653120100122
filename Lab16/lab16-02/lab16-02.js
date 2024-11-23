let scene, camera, renderer, triangle;
let cameraPosition = new THREE.Vector3(0, 0, 5);
let cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');

function init() {
    // สร้าง Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    // สร้าง Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(cameraPosition);

    // สร้าง Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });

    // สร้าง Triangle
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -1.0, -1.0, 0,
         1.0, -1.0, 0,
         0.0,  1.0, 0
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 1 });
    triangle = new THREE.Mesh(geometry, material);
    scene.add(triangle);

    // Event listener สำหรับการปรับค่า Alpha
    const alphaSlider = document.getElementById('alphaValue');
    const alphaDisplay = document.getElementById('alphaDisplay');
    alphaSlider.addEventListener('input', (e) => {
        const alpha = parseFloat(e.target.value);
        triangle.material.opacity = alpha;
        alphaDisplay.textContent = alpha.toFixed(2);
    });

    // Event listener สำหรับการควบคุมด้วยคีย์บอร์ด
    document.addEventListener('keydown', onKeyDown);

    // เริ่ม Animation loop
    animate();
}

function onKeyDown(event) {
    const moveSpeed = 0.1;
    const rotateSpeed = 0.05;

    switch(event.key) {
        case 'ArrowUp':
            cameraPosition.z -= moveSpeed;
            break;
        case 'ArrowDown':
            cameraPosition.z += moveSpeed;
            break;
        case 'ArrowLeft':
            cameraPosition.x -= moveSpeed;
            break;
        case 'ArrowRight':
            cameraPosition.x += moveSpeed;
            break;
        case 'w':
            cameraRotation.x -= rotateSpeed;
            break;
        case 's':
            cameraRotation.x += rotateSpeed;
            break;
        case 'a':
            cameraRotation.y -= rotateSpeed;
            break;
        case 'd':
            cameraRotation.y += rotateSpeed;
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // อัพเดตตำแหน่งและการหมุนของกล้อง
    camera.position.copy(cameraPosition);
    camera.rotation.copy(cameraRotation);

    // ให้กล้องมองไปที่ Triangle
    camera.lookAt(triangle.position);

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