let scene, camera, renderer, pyramid, pointLight;
let rotationSpeed = { x: 0.01, y: 0.01, z: 0.01 };
let autoRotate = true;

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

    // Add point light
    pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    // Add point light helper
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
    scene.add(pointLightHelper);

    // Add GUI to control rotation
    addGUI();

    // Start animation
    animate();
}

function addGUI() {
    const gui = new dat.GUI();
    
    const rotationFolder = gui.addFolder('Rotation');
    rotationFolder.add(rotationSpeed, 'x', 0, 0.1);
    rotationFolder.add(rotationSpeed, 'y', 0, 0.1);
    rotationFolder.add(rotationSpeed, 'z', 0, 0.1);
    rotationFolder.add({ autoRotate: autoRotate }, 'autoRotate').onChange((value) => {
        autoRotate = value;
    });
    rotationFolder.open();

    const lightFolder = gui.addFolder('Point Light');
    lightFolder.add(pointLight.position, 'x', -5, 5);
    lightFolder.add(pointLight.position, 'y', -5, 5);
    lightFolder.add(pointLight.position, 'z', 0, 10);
    lightFolder.add(pointLight, 'intensity', 0, 2);
    lightFolder.addColor(pointLight, 'color');
    lightFolder.open();
}

function animate() {
    requestAnimationFrame(animate);

    if (autoRotate) {
        pyramid.rotation.x += rotationSpeed.x;
        pyramid.rotation.y += rotationSpeed.y;
        pyramid.rotation.z += rotationSpeed.z;
    }

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