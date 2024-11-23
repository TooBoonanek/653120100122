let scene, camera, renderer, pyramid, pointLight;
let raycaster, mouse;
let selectedObject = null;

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
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // If we've previously selected an object, revert its color
        if (selectedObject) {
            selectedObject.material.emissive.setHex(0x000000);
        }

        // Select the first intersected object
        selectedObject = intersects[0].object;

        // Highlight the selected object by setting its emissive color
        selectedObject.material.emissive.setHex(0x555555);

        // Update the selection info
        document.getElementById('selection-info').textContent = `Selected: Pyramid Face ${intersects[0].faceIndex}`;
    } else {
        // If we click on empty space, deselect the object
        if (selectedObject) {
            selectedObject.material.emissive.setHex(0x000000);
            selectedObject = null;
            document.getElementById('selection-info').textContent = 'Click on an object to select it';
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