let gl;
let program;
let vertexBuffer;
let colorBuffer;
let indexBuffer;
let mvpMatrix;
let modelMatrix;
let viewMatrix;
let projectionMatrix;
let cameraPosition;
let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;
let translationZ = -5;

const vertexShaderSource = `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    uniform mat4 uMVPMatrix;
    varying vec3 vColor;
    void main() {
        gl_Position = uMVPMatrix * vec4(aPosition, 1.0);
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

    document.addEventListener('keydown', handleKeyDown);
    document.getElementById('rotate-x').addEventListener('click', () => rotateScene('x'));
    document.getElementById('rotate-y').addEventListener('click', () => rotateScene('y'));
    document.getElementById('rotate-z').addEventListener('click', () => rotateScene('z'));
    document.getElementById('translate-z').addEventListener('click', translateScene);

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
    // Vertex positions for a cube
    const vertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Colors for each vertex
    const colors = [
        // Front face (red)
        1.0, 0.0, 0.0, 1.0, 0.2, 0.2, 1.0, 0.4, 0.4, 1.0, 0.6, 0.6,
        // Back face (green)
        0.0, 1.0, 0.0, 0.2, 1.0, 0.2, 0.4, 1.0, 0.4, 0.6, 1.0, 0.6,
        // Top face (blue)
        0.0, 0.0, 1.0, 0.2, 0.2, 1.0, 0.4, 0.4, 1.0, 0.6, 0.6, 1.0,
        // Bottom face (yellow)
        1.0, 1.0, 0.0, 1.0, 1.0, 0.2, 1.0, 1.0, 0.4, 1.0, 1.0, 0.6,
        // Right face (magenta)
        1.0, 0.0, 1.0, 1.0, 0.2, 1.0, 1.0, 0.4, 1.0, 1.0, 0.6, 1.0,
        // Left face (cyan)
        0.0, 1.0, 1.0, 0.2, 1.0, 1.0, 0.4, 1.0, 1.0, 0.6, 1.0, 1.0
    ];

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Indices for drawing the triangles
    const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ];

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
}

function initMatrices() {
    mvpMatrix = mat4.create();
    modelMatrix = mat4.create();
    viewMatrix = mat4.create();
    projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, glMatrix.toRadian(45), gl.canvas.width / gl.canvas.height, 0.1, 100.0);
}

function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    // Update model matrix
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0, 0, translationZ]);
    mat4.rotateX(modelMatrix, modelMatrix, rotationX);
    mat4.rotateY(modelMatrix, modelMatrix, rotationY);
    mat4.rotateZ(modelMatrix, modelMatrix, rotationZ);

    // Update view matrix
    mat4.lookAt(viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);

    // Combine matrices to form MVP matrix
    mat4.multiply(mvpMatrix, projectionMatrix, viewMatrix);
    mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix);

    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uMVPMatrix'), false, mvpMatrix);

    const positionAttrib = gl.getAttribLocation(program, 'aPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttrib);

    const colorAttrib = gl.getAttribLocation(program, 'aColor');
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttrib);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(drawScene);
}

function handleKeyDown(event) {
    const speed = 0.1;
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
    }
}

function rotateScene(axis) {
    const rotationSpeed = 0.1;
    switch (axis) {
        case 'x':
            rotationX += rotationSpeed;
            break;
        case 'y':
            rotationY += rotationSpeed;
            break;
        case 'z':
            rotationZ += rotationSpeed;
            break;
    }
}

function translateScene() {
    translationZ += 0.5;
    if (translationZ > -2) {
        translationZ = -10;
    }
}

window.onload = initWebGL;