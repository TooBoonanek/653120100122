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
let isDepthTestEnabled = true;

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

    document.getElementById('toggle-depth').addEventListener('click', toggleDepthTest);
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
    // Vertex positions for two overlapping cubes
    const vertices = [
        // Cube 1
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5,
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,
        // Cube 2
        -0.3, -0.3, -0.3,
         0.7, -0.3, -0.3,
         0.7,  0.7, -0.3,
        -0.3,  0.7, -0.3,
        -0.3, -0.3,  0.7,
         0.7, -0.3,  0.7,
         0.7,  0.7,  0.7,
        -0.3,  0.7,  0.7
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Colors for each vertex
    const colors = [
        // Cube 1 (Red)
        1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,
        // Cube 2 (Blue)
        0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0
    ];

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Indices for drawing the triangles
    const indices = [
        // Cube 1
        0, 1, 2,   0, 2, 3,    // Front face
        1, 5, 6,   1, 6, 2,    // Right face
        5, 4, 7,   5, 7, 6,    // Back face
        4, 0, 3,   4, 3, 7,    // Left face
        3, 2, 6,   3, 6, 7,    // Top face
        4, 5, 1,   4, 1, 0,    // Bottom face
        // Cube 2
        8, 9, 10,  8, 10, 11,  // Front face
        9, 13, 14, 9, 14, 10,  // Right face
        13, 12, 15, 13, 15, 14, // Back face
        12, 8, 11, 12, 11, 15, // Left face
        11, 10, 14, 11, 14, 15, // Top face
        12, 13, 9, 12, 9, 8    // Bottom face
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
    
    if (isDepthTestEnabled) {
        gl.enable(gl.DEPTH_TEST);
    } else {
        gl.disable(gl.DEPTH_TEST);
    }

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
    gl.drawElements(gl.TRIANGLES, 72, gl.UNSIGNED_SHORT, 0);
}

function toggleDepthTest() {
    isDepthTestEnabled = !isDepthTestEnabled;
    drawScene();
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