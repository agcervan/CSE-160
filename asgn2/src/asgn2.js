// Angel Cervantes: agcervan@ucsc.edu
// CSE 160 Assignment 2: 3D Blocky Animal --> Peacock

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_GlobalRotationMatrix;\n' +
  'void main() {\n' +
  ' gl_Position = u_GlobalRotationMatrix * u_ModelMatrix * a_Position;\n' +
  '}\n';

var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';


const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;


let canvas;
let gl;

let a_Position;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotationMatrix;

let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 0;

let g_beakAngle = 0;
let g_headAngle = 0;
let g_leftTopWing = 0;
let g_rightTopWing = 0;
let g_neck = 0;

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

var g_wingAnimation = false;
var g_movement = false;

//let g_selectedSeg = 10;
var g_shapesList = [];

function main() {
    // Initialize it all
    setupWebGL();
    connectVariablesToGLSL();
    addActionsForHtmlUI();

    // Mouse stuff
    //canvas.onmousedown = click;
    //canvas.onmousemove = function(ev) {if(ev.buttons == 1) {click(ev)}};

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.clear(gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(tick);
    //renderScene();
}

function setupWebGL() {
    canvas = document.getElementById('webgl');

    gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    u_GlobalRotationMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotationMatrix');
    if (!u_GlobalRotationMatrix) {
        console.log('Failed to get the storage location of u_GlobalRotationMatrix');
        return;
    }

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function addActionsForHtmlUI(){
    // Clear dat
    //document.getElementById('clear').onclick = function() {g_shapesList = []; renderScene();};

    document.getElementById('wingON').onclick = function() {g_wingAnimation = true;};
    document.getElementById('wingOFF').onclick = function() {g_wingAnimation = false; };

    document.getElementById('MoveON').onclick = function() {g_movement = true;};
    document.getElementById('MoveOFF').onclick = function() {g_movement = false; };

    // Size and Segment stuff
    document.getElementById('angleSlide').addEventListener('mousemove', function() {g_globalAngle = this.value; renderScene();});
    //document.getElementById('seg').addEventListener('mouseup', function() {g_selectedSeg = this.value;});

    // Joint Movement
    document.getElementById('angleBeak').addEventListener('mousemove', function() {g_beakAngle = this.value; renderScene();});
    document.getElementById('angleHead').addEventListener('mousemove', function() {g_headAngle = this.value; renderScene();});
    document.getElementById('angleLeftTopWing').addEventListener('mousemove', function() {g_leftTopWing = this.value; renderScene();});
    document.getElementById('angleRightTopWing').addEventListener('mousemove', function() {g_rightTopWing = this.value; renderScene();});
    document.getElementById('angleNeck').addEventListener('mousemove', function() {g_neck = this.value; renderScene();});
    
    
}
/*
function click(ev) {
    let [x, y] = convertCoordinatesEventToGL(ev);
    let point;

    // What's the shape?
    if (g_selectedType == POINT) {
        point = new Point();
    } else if (g_selectedType == TRIANGLE) {
        point = new Triangle();
    } else {
        point = new Circle();
        point.segments = g_selectedSeg;
    }

    point.position = [x, y];
    point.color=g_selectedColor.slice();
    point.size=g_selectedSize;

    g_shapesList.push(point);
    renderAllShapes();
}

function convertCoordinatesEventToGL(ev){
    var x = ev.clientX;
    var y = ev.clientY; 
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
    return([x, y]);
}
*/
function tick(){
    g_seconds = performance.now()/1000.0 - g_startTime;

    updateAnimationAngles();

    renderScene();

    requestAnimationFrame(tick);
}

function updateAnimationAngles() {
    if (g_wingAnimation) {
        g_leftTopWing =(15*Math.sin(2*g_seconds));
        g_rightTopWing =(20*Math.sin(2*g_seconds));
    }

    if (g_movement) {
        g_beakAngle = (5*Math.sin(4*g_seconds));
        g_headAngle = (5*Math.sin(2*g_seconds));
        //g_neck = (5*Math.sin(2*g_seconds));
    }
}

function renderScene() {
    var startTime = performance.now();

    var globalRotMat = new Matrix4().rotate(g_globalAngle,0,1,0);
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, globalRotMat.elements);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawPeacock();

    var duration = performance.now() - startTime;
    sendTextToHTML("ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration)/10, "numdot");

}

function sendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
        console.log("Failed to get " + htmlID + " from HTML");
        return;
    }
    htmlElm.innerHTML = text;
}

