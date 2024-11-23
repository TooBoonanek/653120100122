let scene, camera, renderer, joint;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('jointModelCanvas'), antialias: true });

    // Create joint model
    createJointModel();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Start animation
    animate();
}

function createJointModel() {
    joint = new THREE.Group();

    // Upper arm
    const upperArmGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32);
    const upperArmMaterial = new THREE.MeshPhongMaterial({ color: 0x4287f5 });
    const upperArm = new THREE.Mesh(upperArmGeometry, upperArmMaterial);
    upperArm.position.y = 0.75;
    joint.add(upperArm);

    // Elbow joint
    const elbowGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const elbowMaterial = new THREE.MeshPhongMaterial({ color: 0xf54242 });
    const elbow = new THREE.Mesh(elbowGeometry, elbowMaterial);
    elbow.position.y = -0.05;
    joint.add(elbow);

    // Forearm
    const forearmGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.3, 32);
    const forearmMaterial = new THREE.MeshPhongMaterial({ color: 0x42f554 });
    const forearm = new THREE.Mesh(forearmGeometry, forearmMaterial);
    forearm.position.y = -0.9;
    joint.add(forearm);

    scene.add(joint);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the joint
    joint.rotation.x += 0.01;
    joint.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();