let scene, camera, renderer, pyramid, pointLight;
let raycaster, mouse;
let selectedFace = null;

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

    // Initialize raycaster and mouse
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Add event listener for mouse click
    window.addEventListener('click', onMouseClick, false);

    // Add GUI to control rotation
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

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(pyramid);

    if (intersects.length > 0) {
        // If we've previously selected a face, revert its color
        if (selectedFace !== null) {
            pyramid.material[selectedFace].emissive.setHex(0x000000);
        }

        // Select the intersected face
        selectedFace = intersects[0].face.materialIndex;

        // Highlight the selected face by setting its emissive color
        pyramid.material[selectedFace].emissive.setHex(0x555555);

        // Update the selection info
        document.getElementById('selection-info').textContent = `Selected: Face ${selectedFace + 1}`;
    } else {
        // If we click on empty space, deselect the face
        if (selectedFace !== null) {
            pyramid.material[selectedFace].emissive.setHex(0x000000);
            selectedFace = null;
            document.getElementById('selection-info').textContent = 'Click on a face to select it';
        }
    }
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