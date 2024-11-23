let scene, camera, renderer, pyramid;

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
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add GUI to control translation and rotation
    addGUI();

    // Start animation
    animate();
}

function addGUI() {
    const gui = new dat.GUI();
    
    const positionFolder = gui.addFolder('Position');
    positionFolder.add(pyramid.position, 'x', -3, 3);
    positionFolder.add(pyramid.position, 'y', -3, 3);
    positionFolder.add(pyramid.position, 'z', -3, 3);
    positionFolder.open();

    const rotationFolder = gui.addFolder('Rotation');
    rotationFolder.add(pyramid.rotation, 'x', 0, Math.PI * 2);
    rotationFolder.add(pyramid.rotation, 'y', 0, Math.PI * 2);
    rotationFolder.add(pyramid.rotation, 'z', 0, Math.PI * 2);
    rotationFolder.open();
}

function animate() {
    requestAnimationFrame(animate);
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