let gl;
let program;
let vertexBuffer;
let colorBuffer;
let modelViewMatrix;
let projectionMatrix;
let eyePosition;

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

    eyePosition = [0, 0, 5];

    document.getElementById('move-left').addEventListener('click', () => moveCamera(-0.1, 0, 0));
    document.getElementById('move-right').addEventListener('click', () => moveCamera(0.1, 0, 0));
    document.getElementById('move-up').addEventListener('click', () => moveCamera(0, 0.1, 0));
    document.getElementById('move-down').addEventListener('click', () => moveCamera(0, -0.1, 0));

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
    const vertices = [
        // Triangle 1
        -0.5, -0.5, -2.0,
        0.5, -0.5, -2.0,
        0.0, 0.5, -2.0,
        // Triangle 2
        -0.5, -0.5, -3.0,
        0.5, -0.5, -3.0,
        0.0, 0.5, -3.0,
        // Triangle 3
        -0.5, -0.5, -4.0,
        0.5, -0.5, -4.0,
        0.0, 0.5, -4.0
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const colors = [
        // Triangle 1 (Red to Yellow)
        1.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.5, 0.0,
        // Triangle 2 (Green to Cyan)
        0.0, 1.0, 0.0,
        0.0, 1.0, 1.0,
        0.0, 0.5, 0.5,
        // Triangle 3 (Blue to Magenta)
        0.0, 0.0, 1.0,
        1.0, 0.0, 1.0,
        0.5, 0.0, 0.5
    ];

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function initMatrices() {
    modelViewMatrix = mat4.create();
    projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, Math.PI / 4, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
}

function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    mat4.lookAt(modelViewMatrix, eyePosition, [0, 0, -3], [0, 1, 0]);

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

    gl.drawArrays(gl.TRIANGLES, 0, 9);
}

function moveCamera(x, y, z) {
    eyePosition[0] += x;
    eyePosition[1] += y;
    eyePosition[2] += z;
    drawScene();
}

window.onload = initWebGL;