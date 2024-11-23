let scene, camera, renderer, pyramid, pointLight;
let lastTime = 0;
let frameCount = 0;

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
        new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide }), // Red
        new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide }), // Green
        new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide }), // Blue
        new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide }), // Yellow
        new THREE.MeshPhongMaterial({ color: 0xff00ff, side: THREE.DoubleSide }), // Magenta (base)
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

    // Add GUI to control rotation and light
    addGUI();

    // Start animation
    animate();
}

function addGUI() {
    const gui = new dat.GUI();
    
    const rotationFolder = gui.addFolder('Rotation');
    rotationFolder.add(pyramid.rotation, 'x', 0, Math.PI * 2);
    rotationFolder.add(pyramid.rotation, 'y', 0, Math.PI * 2);
    rotationFolder.add(pyramid.rotation, 'z', 0, Math.PI * 2);
    rotationFolder.open();

    const lightFolder = gui.addFolder('Point Light');
    lightFolder.add(pointLight.position, 'x', -5, 5);
    lightFolder.add(pointLight.position, 'y', -5, 5);
    lightFolder.add(pointLight.position, 'z', 0, 10);
    lightFolder.add(pointLight, 'intensity', 0, 2);
    lightFolder.addColor(pointLight, 'color');
    lightFolder.open();
}

function updateHUD() {
    document.getElementById('rotation').textContent = `Rotation: X: ${pyramid.rotation.x.toFixed(2)}, Y: ${pyramid.rotation.y.toFixed(2)}, Z: ${pyramid.rotation.z.toFixed(2)}`;
    document.getElementById('light-position').textContent = `Light Position: X: ${pointLight.position.x.toFixed(2)}, Y: ${pointLight.position.y.toFixed(2)}, Z: ${pointLight.position.z.toFixed(2)}`;
}

function animate(time) {
    requestAnimationFrame(animate);

    // Calculate FPS
    frameCount++;
    if (time - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (time - lastTime));
        document.getElementById('fps').textContent = `FPS: ${fps}`;
        frameCount = 0;
        lastTime = time;
    }

    // Update HUD
    updateHUD();

    // Render scene
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