let scene, camera, renderer, pyramid, ambientLight;

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

    // Create materials for each face
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff0000 }), // Red
        new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Green
        new THREE.MeshPhongMaterial({ color: 0x0000ff }), // Blue
        new THREE.MeshPhongMaterial({ color: 0xffff00 }), // Yellow
    ];

    // Create pyramid mesh
    pyramid = new THREE.Mesh(geometry, materials);
    scene.add(pyramid);

    // Add ambient light
    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add GUI to control ambient light intensity
    addGUI();

    // Start animation
    animate();
}

function addGUI() {
    const gui = new dat.GUI();
    const lightFolder = gui.addFolder('Ambient Light');
    lightFolder.add(ambientLight, 'intensity', 0, 1).name('Intensity');
    lightFolder.open();
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