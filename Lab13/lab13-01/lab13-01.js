let scene, camera, renderer, pyramid, light;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });

    // Create pyramid geometry
    const geometry = new THREE.ConeGeometry(1, 2, 4);

    // Create material with diffuse reflection
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 100,
        side: THREE.DoubleSide
    });

    // Create pyramid mesh
    pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add point light for diffuse reflection
    light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate pyramid
    pyramid.rotation.x += 0.01;
    pyramid.rotation.y += 0.01;

    // Move light in a circular path
    const time = Date.now() * 0.001;
    light.position.x = Math.sin(time) * 3;
    light.position.y = Math.cos(time) * 3;
    light.position.z = Math.cos(time) * 3 + 5;

    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Initialize the scene
init();