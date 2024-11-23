let gl;
let program;
let vertexBuffer;
let colorBuffer;
let indexBuffer;
let modelViewMatrix;
let projectionMatrix;
let isOrtho = true;

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

    document.getElementById('toggle-projection').addEventListener('click', toggleProjection);

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
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5,
        -0.5, -0.5,  0.5,
        0.5, -0.5,  0.5,
        0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Colors for each vertex
    const colors = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        0.0, 1.0, 1.0,
        0.5, 0.5, 0.5,
        1.0, 0.5, 0.0
    ];

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Indices for drawing the triangles
    const indices = [
        0, 1, 2,    0, 2, 3,
        1, 5, 6,    1, 6, 2,
        5, 4, 7,    5, 7, 6,
        4, 0, 3,    4, 3, 7,
        3, 2, 6,    3, 6, 7,
        4, 5, 1,    4, 1, 0
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
    if (isOrtho) {
        mat4.ortho(projectionMatrix, -4, 4, -3, 3, 0.1, 100);
    } else {
        mat4.perspective(projectionMatrix, Math.PI / 4, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    }
}

function drawScene(timestamp) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    const rotationAngle = timestamp * 0.001;

    // Draw multiple cubes
    drawCube([-1.5, 0, -7], rotationAngle);
    drawCube([1.5, 0, -7], -rotationAngle);
    drawCube([0, 1.5, -7], rotationAngle * 0.5);
    drawCube([0, -1.5, -7], -rotationAngle * 0.5);

    requestAnimationFrame(drawScene);
}

function drawCube(position, rotationAngle) {
    mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, position);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotationAngle, [1, 1, 1]);

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
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}

function toggleProjection() {
    isOrtho = !isOrtho;
    updateProjection();
    document.getElementById('projection-type').textContent = `Current: ${isOrtho ? 'Orthographic' : 'Perspective'}`;
}

window.onload = initWebGL;