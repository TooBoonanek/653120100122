let scene, camera, renderer, pyramid;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') });

    // Create pyramid geometry
    const geometry = new THREE.ConeGeometry(1, 2, 4);

    // Create materials for each face
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
        new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
        new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
    ];

    // Create pyramid mesh
    pyramid = new THREE.Mesh(geometry, materials);
    scene.add(pyramid);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate pyramid
    pyramid.rotation.x += 0.01;
    pyramid.rotation.y += 0.01;

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