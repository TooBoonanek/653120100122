let gl;
let program;
let vertexBuffer;
let colorBuffer;
let indexBuffer;
let modelViewMatrix;
let projectionMatrix;
let cameraPosition;
let cameraRotation;
let fov;

const vertexShaderSource = `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying vec3 vColor;
    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
        vColor = aColor;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }
`;

function initWebGL() {
    const canvas = document.getElementById('webgl-canvas');
    gl = canvas.getContext('webgl');

    if (!gl) {
        console.error('WebGL not supported');
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    program = createProgram(vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);

    initBuffers();
    initMatrices();

    cameraPosition = [0, 0, 5];
    cameraRotation = [0, 0];
    fov = Math.PI / 4;

    document.addEventListener('keydown', handleKeyDown);

    requestAnimationFrame(drawScene);
}

function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(vertexSource, fragmentSource) {
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

function initBuffers() {
    // Vertex positions for a pyramid
    const vertices = [
        // Front face
        0.0,  1.0,  0.0,
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        // Right face
        0.0,  1.0,  0.0,
        1.0, -1.0,  1.0,
        1.0, -1.0, -1.0,
        // Back face
        0.0,  1.0,  0.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        // Left face
        0.0,  1.0,  0.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Colors for each vertex
    const colors = [
        // Front face (red)
        1.0, 0.0, 0.0,
        0.8, 0.0, 0.0,
        0.6, 0.0, 0.0,
        // Right face (green)
        0.0, 1.0, 0.0,
        0.0, 0.8, 0.0,
        0.0, 0.6, 0.0,
        // Back face (blue)
        0.0, 0.0, 1.0,
        0.0, 0.0, 0.8,
        0.0, 0.0, 0.6,
        // Left face (yellow)
        1.0, 1.0, 0.0,
        0.8, 0.8, 0.0,
        0.6, 0.6, 0.0
    ];

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Indices for drawing the triangles
    const indices = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11
    ];

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
}

function initMatrices() {
    modelViewMatrix = mat4.create();
    projectionMatrix = mat4.create();
    updateProjection();
}

function updateProjection() {
    mat4.perspective(projectionMatrix, fov, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
}

function drawScene(timestamp) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    const rotationAngle = timestamp * 0.001;

    // Draw multiple pyramids
    drawPyramid([-2, 0, -7], rotationAngle);
    drawPyramid([2, 0, -7], -rotationAngle);
    drawPyramid([0, 2, -7], rotationAngle * 0.5);
    drawPyramid([0, -2, -7], -rotationAngle * 0.5);

    requestAnimationFrame(drawScene);
}

function drawPyramid(position, rotationAngle) {
    mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, position);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotationAngle, [0, 1, 0]);

    // Apply camera transformation
    const cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, cameraPosition);
    mat4.rotateX(cameraMatrix, cameraMatrix, cameraRotation[0]);
    mat4.rotateY(cameraMatrix, cameraMatrix, cameraRotation[1]);
    mat4.invert(cameraMatrix, cameraMatrix);
    mat4.multiply(modelViewMatrix, cameraMatrix, modelViewMatrix);

    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uModelViewMatrix'), false, modelViewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uProjectionMatrix'), false, projectionMatrix);

    const positionAttrib = gl.getAttribLocation(program, 'aPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttrib);

    const colorAttrib = gl.getAttribLocation(program, 'aColor');
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttrib);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, 12, gl.UNSIGNED_SHORT, 0);
}

function handleKeyDown(event) {
    const speed = 0.1;
    const rotationSpeed = 0.05;
    switch (event.key.toLowerCase()) {
        case 'w':
            cameraPosition[2] -= speed;
            break;
        case 's':
            cameraPosition[2] += speed;
            break;
        case 'a':
            cameraPosition[0] -= speed;
            break;
        case 'd':
            cameraPosition[0] += speed;
            break;
        case 'q':
            cameraPosition[1] += speed;
            break;
        case 'e':
            cameraPosition[1] -= speed;
            break;
        case 'arrowup':
            cameraRotation[0] -= rotationSpeed;
            break;
        case 'arrowdown':
            cameraRotation[0] += rotationSpeed;
            break;
        case 'arrowleft':
            cameraRotation[1] -= rotationSpeed;
            break;
        case 'arrowright':
            cameraRotation[1] += rotationSpeed;
            break;
        case 'z':
            fov = Math.min(fov + 0.1, Math.PI - 0.1);
            updateProjection();
            break;
        case 'x':
            fov = Math.max(fov - 0.1, 0.1);
            updateProjection();
            break;
    }
}

window.onload = initWebGL;