let scene, camera, renderer, pyramid, pointLight;

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

    // Create material for the pyramid
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

    // Add point light
    pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    // Add point light helper
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
    scene.add(pointLightHelper);

    // Add GUI to control point light
    addGUI();

    // Start animation
    animate();
}

function addGUI() {
    const gui = new dat.GUI();
    
    const lightFolder = gui.addFolder('Point Light');
    lightFolder.add(pointLight.position, 'x', -5, 5);
    lightFolder.add(pointLight.position, 'y', -5, 5);
    lightFolder.add(pointLight.position, 'z', 0, 10);
    lightFolder.add(pointLight, 'intensity', 0, 2);
    lightFolder.addColor(pointLight, 'color');
    lightFolder.open();

    const pyramidFolder = gui.addFolder('Pyramid');
    pyramidFolder.add(pyramid.rotation, 'x', 0, Math.PI * 2);
    pyramidFolder.add(pyramid.rotation, 'y', 0, Math.PI * 2);
    pyramidFolder.add(pyramid.rotation, 'z', 0, Math.PI * 2);
    pyramidFolder.open();
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