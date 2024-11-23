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

    // Create custom shader material for per-fragment lighting
    const material = new THREE.ShaderMaterial({
        uniforms: {
            pointLightPosition: { value: new THREE.Vector3(0, 3, 5) },
            pointLightColor: { value: new THREE.Color(0xffffff) },
            pointLightIntensity: { value: 1.0 },
            ambientLightColor: { value: new THREE.Color(0x404040) },
            diffuseColor: { value: new THREE.Color(0xffffff) }
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;

            void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 pointLightPosition;
            uniform vec3 pointLightColor;
            uniform float pointLightIntensity;
            uniform vec3 ambientLightColor;
            uniform vec3 diffuseColor;

            varying vec3 vNormal;
            varying vec3 vPosition;

            void main() {
                vec3 normal = normalize(vNormal);
                vec3 lightDir = normalize(pointLightPosition - vPosition);
                
                // Ambient component
                vec3 ambient = ambientLightColor;

                // Diffuse component
                float diff = max(dot(normal, lightDir), 0.0);
                vec3 diffuse = diff * pointLightColor * pointLightIntensity;

                // Combine lighting components
                vec3 lighting = (ambient + diffuse) * diffuseColor;

                gl_FragColor = vec4(lighting, 1.0);
            }
        `,
        side: THREE.DoubleSide
    });

    // Create pyramid mesh
    pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

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
    lightFolder.add(pointLight.position, 'x', -5, 5).onChange(updateShaderUniforms);
    lightFolder.add(pointLight.position, 'y', -5, 5).onChange(updateShaderUniforms);
    lightFolder.add(pointLight.position, 'z', 0, 10).onChange(updateShaderUniforms);
    lightFolder.add(pointLight, 'intensity', 0, 2).onChange(updateShaderUniforms);
    lightFolder.addColor(pointLight, 'color').onChange(updateShaderUniforms);
    lightFolder.open();

    const pyramidFolder = gui.addFolder('Pyramid');
    pyramidFolder.add(pyramid.rotation, 'x', 0, Math.PI * 2);
    pyramidFolder.add(pyramid.rotation, 'y', 0, Math.PI * 2);
    pyramidFolder.add(pyramid.rotation, 'z', 0, Math.PI * 2);
    pyramidFolder.open();
}

function updateShaderUniforms() {
    pyramid.material.uniforms.pointLightPosition.value.copy(pointLight.position);
    pyramid.material.uniforms.pointLightColor.value.copy(pointLight.color);
    pyramid.material.uniforms.pointLightIntensity.value = pointLight.intensity;
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