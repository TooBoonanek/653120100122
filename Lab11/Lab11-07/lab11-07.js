let scene, camera, renderer, shape;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });

    // Create abstract shape
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 100,
        vertexColors: true
    });

    // Add vertex colors
    const colors = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        colors.push(Math.random(), Math.random(), Math.random());
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Add lights
    const light1 = new THREE.PointLight(0xff0000, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x0000ff, 1, 100);
    light2.position.set(-5, -5, -5);
    scene.add(light2);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the shape
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Initialize the scene
init();