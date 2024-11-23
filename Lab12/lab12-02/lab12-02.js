let gl;
let program;
let vertexBuffer;
let colorBuffer;
let indexBuffer;
let mvpMatrix;
let modelMatrix;
let viewMatrix;
let projectionMatrix;
let rotationMatrix;

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

    document.getElementById('rotate-x').addEventListener('click', () => rotate('x'));
    document.getElementById('rotate-y').addEventListener('click', () => rotate('y'));
    document.getElementById('rotate-z').addEventListener('click', () => rotate('z'));
    document.getElementById('reset').addEventListener('click', resetRotation);

    drawScene();
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
        // Base
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // Apex
         0.0,  1.0,  0.0
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Colors for each vertex (gradient effect)
    const colors = [
        // Base (gradient from red to yellow)
        1.0, 0.0, 0.0,
        1.0, 0.5, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.5, 0.0,
        // Apex (white)
        1.0, 1.0, 1.0
    ];

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Indices for drawing the triangles
    const indices = [
        0, 1, 4,  // Front face
        1, 2, 4,  // Right face
        2, 3, 4,  // Back face
        3, 0, 4,  // Left face
        0, 2, 1,  // Base (part 1)
        0, 3, 2   // Base (part 2)
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
    rotationMatrix = mat4.create();

    mat4.perspective(projectionMatrix, glMatrix.toRadian(45), gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    mat4.lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);
}

function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    mat4.multiply(mvpMatrix, viewMatrix, modelMatrix);
    mat4.multiply(mvpMatrix, projectionMatrix, mvpMatrix);
    mat4.multiply(mvpMatrix, mvpMatrix, rotationMatrix);

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
    gl.drawElements(gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0);
}

function rotate(axis) {
    const angle = Math.PI / 18; // 10 degrees
    switch (axis) {
        case 'x':
            mat4.rotateX(rotationMatrix, rotationMatrix, angle);
            break;
        case 'y':
            mat4.rotateY(rotationMatrix, rotationMatrix, angle);
            break;
        case 'z':
            mat4.rotateZ(rotationMatrix, rotationMatrix, angle);
            break;
    }
    drawScene();
}

function resetRotation() {
    mat4.identity(rotationMatrix);
    drawScene();
}

window.onload = initWebGL;