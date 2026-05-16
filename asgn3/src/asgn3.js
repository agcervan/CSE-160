// Angel Cervantes: agcervan@ucsc.edu
// CSE 160 Assignment 3: 3D Blocky World

var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec2 a_UV;

  varying vec2 v_UV;

  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotationMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotationMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

/*
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_GlobalRotationMatrix;\n' +
  'void main() {\n' +
  ' gl_Position = u_GlobalRotationMatrix * u_ModelMatrix * a_Position;\n' +
  '}\n';
  */

var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform sampler2D u_Sampler4;
  uniform int u_whichTexture;

  void main() {
    if(u_whichTexture == 0) {  
      gl_FragColor = u_FragColor;
    } else if(u_whichTexture == -1) {
      gl_FragColor = vec4(v_UV, 1.0, 1.0);
    } else if(u_whichTexture == -2) {
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    } else if(u_whichTexture == -3) {
      gl_FragColor = texture2D(u_Sampler1, v_UV);
    } else if(u_whichTexture == -4) {
      gl_FragColor = texture2D(u_Sampler2, v_UV);
    } else if(u_whichTexture == -5) {
      gl_FragColor = texture2D(u_Sampler3, v_UV);
    } else if(u_whichTexture == -6) {
      gl_FragColor = texture2D(u_Sampler4, v_UV);
    }
  }`

  /*
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';
*/

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;


let canvas;
let gl;

let a_Position;
let a_UV;
let v_UV;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotationMatrix;
let u_ViewMatrix;
let u_ProjectionMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_whichTexture;
let camera

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

var g_shapesList = [];
var g_eye = 0;
var g_map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

function main() {
    // Initialize it all
    setupWebGL();
    connectVariablesToGLSL();
    addActionsForHtmlUI();
    initTextures();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    camera = new Camera();
    camera.eye = new Vector3([0, 0, 3]);
    camera.at = new Vector3([0, 0, -100]);
    camera.up = new Vector3([0, 1, 0]);

    document.onkeydown = keydown;

    renderScene();

    requestAnimationFrame(tick);
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

    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    if (!a_UV) {
        console.log('Failed to get the storage location of a_UV');
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

    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
        console.log('Failed to get the storage location of u_ViewMatrix');
        return;
    }

    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
        console.log('Failed to get the storage location of u_ProjectionMatrix');
        return;
    }

    u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    if (!u_Sampler0) {
        console.log('Failed to get the storage location of u_Sampler0');
        return false;
    }

    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler1) {
        console.log('Failed to get the storage location of u_Sampler1');
        return false;
    }

    u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
    if (!u_Sampler2) {
        console.log('Failed to get the storage location of u_Sampler2');
        return false;
    }

    u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
    if (!u_Sampler3) {
        console.log('Failed to get the storage location of u_Sampler3');
        return false;
    }

    u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
    if (!u_Sampler4) {
        console.log('Failed to get the storage location of u_Sampler4');
        return false;
    }

    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if(!u_whichTexture) {
        console.log('Failed to create texture option object');
        return false;
  }

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, identityM.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, identityM.elements);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, identityM.elements);
}

function addActionsForHtmlUI(){

    //document.getElementById('wingON').onclick = function() {g_wingAnimation = true;};
    //document.getElementById('wingOFF').onclick = function() {g_wingAnimation = false; };

    //document.getElementById('MoveON').onclick = function() {g_movement = true;};
    //document.getElementById('MoveOFF').onclick = function() {g_movement = false; };

    document.getElementById('angleSlide').addEventListener('mousemove', function() {g_globalAngle = this.value; renderScene();});

    // Joint Movement
    //document.getElementById('angleBeak').addEventListener('mousemove', function() {g_beakAngle = this.value; renderScene();});
    //document.getElementById('angleHead').addEventListener('mousemove', function() {g_headAngle = this.value; renderScene();});
    //document.getElementById('angleLeftTopWing').addEventListener('mousemove', function() {g_leftTopWing = this.value; renderScene();});
    //document.getElementById('angleRightTopWing').addEventListener('mousemove', function() {g_rightTopWing = this.value; renderScene();});
    //document.getElementById('angleNeck').addEventListener('mousemove', function() {g_neck = this.value; renderScene();});
    
}

function initTextures() {
    let image0 = new Image();
    if(!image0) {
        console.log('Failed to create image object');
        return false;
    }
    image0.onload = function() { loadTexture0(image0); };
    image0.src = '../images/sky.jpg';

    let image1 = new Image();
    if(!image1) {
        console.log('Failed to create image object');
        return false;
    } 
    image1.onload = function() { loadTexture1(image1); };
    image1.src = '../images/log.jpg';

    let image2 = new Image();
    if(!image2) {
        console.log('Failed to create image object');
        return false;
    } 
    image2.onload = function() { loadTexture2(image2); };
    image2.src = '../images/mango.jpg';

    let image3 = new Image();
    if(!image3) {
        console.log('Failed to create image object');
        return false;
    } 
    image3.onload = function() { loadTexture3(image3); };
    image3.src = '../images/pink.jpg';

    let image4 = new Image();
    if(!image4) {
        console.log('Failed to create image object');
        return false;
    } 
    image4.onload = function() { loadTexture4(image4); };
    image4.src = '../images/purple.jpg';

    return true;
}

function loadTexture0(image) {
    let texture = gl.createTexture();
        if(!texture) {
            console.log('Failed to create the texture object');
            return false;
        }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler0, 0);

    console.log("Finished loading 0");
}

function loadTexture1(image) {
    let texture = gl.createTexture();
        if(!texture) {
            console.log('Failed to create the texture object');
            return false;
        }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler1, 1);

    console.log("Finished loading 1");
}

function loadTexture2(image) {
    let texture = gl.createTexture();
        if(!texture) {
            console.log('Failed to create the texture object');
            return false;
        }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler2, 2);

    console.log("Finished loading 2");
}

function loadTexture3(image) {
    let texture = gl.createTexture();
        if(!texture) {
            console.log('Failed to create the texture object');
            return false;
        }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler3, 3);

    console.log("Finished loading 3");
}

function loadTexture4(image) {
    let texture = gl.createTexture();
        if(!texture) {
            console.log('Failed to create the texture object');
            return false;
        }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler4, 4);

    console.log("Finished loading 4");
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

    //updateAnimationAngles();

    renderScene();

    requestAnimationFrame(tick);
}

function drawMap() {
    for (x = 0; x < 32; x++) {
        for (y = 0; y < 32; y++) {
            if (g_map[x][y]==1) {
                var obstacle = new Cube();
                obstacle.color = [1.0,0.0,1.0,1.0];
                obstacle.textureNum = -3;
                obstacle.matrix.translate(0,-0.5,0);
                obstacle.matrix.scale(0.3,0.3,0.3);
                obstacle.matrix.translate(x-4,0.0,y-4);
                obstacle.render();
            }
            else if (g_map[x][y]==2) {
                var obstacle1 = new Cube();
                obstacle1.color = [1.0,0.0,1.0,1.0];
                obstacle1.textureNum = -4;
                obstacle1.matrix.translate(0,-0.5,0);
                obstacle1.matrix.scale(0.3,0.3,0.3);
                obstacle1.matrix.translate(x-4,0.0,y-4);
                obstacle1.render();
            }
            else if (g_map[x][y]==3) {
                var obstacle2 = new Cube();
                obstacle2.color = [1.0,0.0,1.0,1.0];
                obstacle2.textureNum = -5;
                obstacle2.matrix.translate(0,-0.5,0);
                obstacle2.matrix.scale(0.3,0.3,0.3);
                obstacle2.matrix.translate(x-4,0.0,y-4);
                obstacle2.render();
            }
            else if (g_map[x][y]==4) {
                var obstacle3 = new Cube();
                obstacle3.color = [1.0,0.0,1.0,1.0];
                obstacle3.textureNum = -6;
                obstacle3.matrix.translate(0,-0.5,0);
                obstacle3.matrix.scale(0.3,0.3,0.3);
                obstacle3.matrix.translate(x-4,0.0,y-4);
                obstacle3.render();
            }
        }
    }
}

function renderScene() {
    var startTime = performance.now();

    //var projMat = new Matrix4();
    //projMat.setPerspective(60, canvas.width/canvas.height, 0.1, 1000);
    //gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    let projMat = camera.projectMatrix;
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    //var viewMat = new Matrix4();
    //viewMat.setLookAt(0,0,3, 0,0,-100, 0,1,0);
    //viewMat.setLookAt(g_eye,0,3, 0,0,-100, 0,1,0);
    //gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

    let viewMat = camera.viewMatrix;
    viewMat.setLookAt(
    camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2],
    camera.at.elements[0], camera.at.elements[1], camera.at.elements[2],
    camera.up.elements[0], camera.up.elements[1], camera.up.elements[2]);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

    var globalRotMat = new Matrix4().rotate(g_globalAngle,0,1,0);
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, globalRotMat.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);
    /*
    var body = new Cube();
    body.color = [1.0,0.0,0.0,1.0];
    body.textureNum = -3;
    body.matrix.translate(-0.35,-0.5,0.0);
    body.matrix.scale(0.3,0.3,0.3);
    body.render();
    */
    
    
    var mix = new Cube();
    mix.color = [0.5,1.0,0.5,1.0];
    mix.textureNum = -1;
    mix.matrix.translate(-0.35,-0.5,0.5);
    mix.matrix.scale(0.3,0.3,0.3);
    mix.render(); 

    var ground = new Cube();
    ground.color = [0.06,0.6,0.1,1.0];
    ground.textureNum = 0;
    ground.matrix.translate(0.0,-0.75,0.0);
    ground.matrix.scale(32,0.02,32);
    ground.matrix.translate(-0.5,0.0,-0.5);
    ground.render();

    var sky = new Cube();
    sky.color = [1.0,1.0,0.0,1.0];
    sky.textureNum = -2;
    sky.matrix.scale(50,50,50);
    sky.matrix.translate(-0.5,-0.5,-0.5);
    sky.render();

    drawMap();

    var duration = performance.now() - startTime;
    sendTextToHTML("ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration)/10, "numdot");

}

// KEYBOARD MOVEMENT FUNC
function keydown(ev) {
  // console.log(camera.at.elements);
  if(ev.keyCode == 39 || ev.keyCode == 68) {
    g_eye += 0.2;
    camera.moveRight();
  }
  else if(ev.keyCode == 37 || ev.keyCode == 65) {
    g_eye -= 0.2;
    camera.moveLeft();
  }
  else if(ev.keyCode == 38 || ev.keyCode == 87) {
    camera.moveForward();
  }
  else if(ev.keyCode == 40 || ev.keyCode == 83) {
    camera.moveBackward();
  }
  else if(ev.keyCode == 81) {
    camera.panLeft();
  }
  else if(ev.keyCode == 69) {
    camera.panRight();
  }
 
  renderScene();
}

function sendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
        console.log("Failed to get " + htmlID + " from HTML");
        return;
    }
    htmlElm.innerHTML = text;
}

