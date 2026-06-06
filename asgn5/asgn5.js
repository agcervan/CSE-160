// Angel Cervantes: agcervan@ucsc.edu
// CSE 160 Assignment 5

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let canvas, renderer, scene, camera3;

let g_globalAngle = 0;
let g_lightPos    = [5.0, 8.0, 5.0];
let g_normal      = false;
let g_light       = true;
let g_lightM      = false;

let g_startTime = performance.now() / 1000.0;
let g_seconds   = 0;

const g_eye = new THREE.Vector3(0, 4, 12);
const g_at  = new THREE.Vector3(0, 1,  0);
const UP    = new THREE.Vector3(0, 1,  0);

let dirLightRef = null;
let lightMarker = null;

// moving cube stuff
let slideCube = null;
const SLIDE_BASE_X = 0;

let pinkCube = null;

const loader = new THREE.TextureLoader();
loader.load('sky.jpg', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;
});

const matLight  = new THREE.MeshBasicMaterial({ color: 0xffff88 });
const matNormal = new THREE.MeshNormalMaterial();

// color stuff
const blue     = new THREE.MeshLambertMaterial({ color: 0x3366cc });
const red = new THREE.MeshLambertMaterial({ color: 0xcc3333 });
const green   = new THREE.MeshLambertMaterial({ color: 0x33aa55 });
const orange = new THREE.MeshLambertMaterial({ color: 0xff6600 });;
const yellow = new THREE.MeshLambertMaterial({ color: 0xffff00 });;
const purple = new THREE.MeshLambertMaterial({ color: 0x8800ff });;

function main() {
  canvas   = document.getElementById('webgl');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.width, canvas.height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x87ceeb);

  camera3 = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 200);
  camera3.position.copy(g_eye);
  camera3.lookAt(g_at);

  scene = new THREE.Scene();

  buildScene();
  addActionsForHtmlUI();
  document.onkeydown = keydown;
  addMouseOrbit();

  requestAnimationFrame(tick);
}

// build da scene
async function buildScene() {

  // Ambient Light
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // Directional Light
  dirLightRef = new THREE.DirectionalLight(0xfff5cc, 1.2);
  dirLightRef.position.set(...g_lightPos);
  dirLightRef.castShadow = true;
  dirLightRef.shadow.mapSize.set(2048, 2048);
  dirLightRef.shadow.camera.near  = 0.5;
  dirLightRef.shadow.camera.far   = 60;
  dirLightRef.shadow.camera.left  = dirLightRef.shadow.camera.bottom = -15;
  dirLightRef.shadow.camera.right = dirLightRef.shadow.camera.top    =  15;
  scene.add(dirLightRef);

  // Hemisphere Light
  const hemi = new THREE.HemisphereLight(0x87ceeb, 0x4a7a20, 0.5);
  scene.add(hemi);

  // Light cube thing
  lightMarker = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), matLight);
  lightMarker.position.set(...g_lightPos);
  scene.add(lightMarker);

  // Ground 
  const ground = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 20), new THREE.MeshLambertMaterial({ color: 0x4a8c2a }));
  ground.position.set(0, -0.5, 0);
  ground.receiveShadow = true;
  //ground.userData.baseMat = matGround;
  scene.add(ground);
  
  // texture stuff for other cube
  const textureLoader = new THREE.TextureLoader();
  const pinkTexture = textureLoader.load('pink.jpg');
  const pCube = new THREE.MeshLambertMaterial({ map: pinkTexture });

  // Test first by adding simple shapes: cube, cylinder, sphere

  // CUBES
  // pink texture
  pinkCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), pCube);
  pinkCube.position.set(5, 0.5, 0);
  pinkCube.castShadow = true;
  pinkCube.receiveShadow = true;
  pinkCube.userData.baseMat = pCube;
  scene.add(pinkCube);

  // blue (with movement)
  slideCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), blue);
  slideCube.position.set(SLIDE_BASE_X, 0.5, 0);
  slideCube.castShadow = true;
  slideCube.receiveShadow = true;
  slideCube.userData.baseMat = blue;
  scene.add(slideCube);

  const cube3 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), green);
  cube3.position.set(-1, 0.375, -2);
  cube3.castShadow = true;
  cube3.receiveShadow = true;
  cube3.userData.baseMat = green;
  scene.add(cube3);

  const cube4 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), red);
  cube4.position.set(-2, 0.375, -5);
  cube4.castShadow = true;
  cube4.receiveShadow = true;
  cube4.userData.baseMat = red;
  scene.add(cube4);

  const cube5 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), yellow);
  cube5.position.set(2, 0.25, -5);
  cube5.castShadow = true;
  cube5.receiveShadow = true;
  cube5.userData.baseMat = yellow;
  scene.add(cube5);

  const cube6 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), purple);
  cube6.position.set(5, 0.375, -6);
  cube6.castShadow = true;
  cube6.receiveShadow = true;
  cube6.userData.baseMat = purple;
  scene.add(cube6);

  const cube7 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), orange);
  cube7.position.set(3, 0.3, 5);
  cube7.castShadow = true;
  cube7.receiveShadow = true;
  cube7.userData.baseMat = orange;
  scene.add(cube7);

  // 6 CYLINDERS
  const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 16), red);
  cylinder.position.set(-3, 0.75, 0);
  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  cylinder.userData.baseMat = red;
  scene.add(cylinder);

  const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 2, 16), orange);
  cylinder2.position.set(-5, 1, 5);
  cylinder2.castShadow = true;
  cylinder2.receiveShadow = true;
  cylinder2.userData.baseMat = orange;
  scene.add(cylinder2);

  const cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16), blue);
  cylinder3.position.set(-5, 0.25, 2);
  cylinder3.castShadow = true;
  cylinder3.receiveShadow = true;
  cylinder3.userData.baseMat = blue;
  scene.add(cylinder3);

  const cylinder4 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.5, 16), yellow);
  cylinder4.position.set(-1, 0.25, 4);
  cylinder4.castShadow = true;
  cylinder4.receiveShadow = true;
  cylinder4.userData.baseMat = yellow;
  scene.add(cylinder4);

  const cylinder5 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.6, 16), green);
  cylinder5.position.set(-3, 0.3, 6);
  cylinder5.castShadow = true;
  cylinder5.receiveShadow = true;
  cylinder5.userData.baseMat = green;
  scene.add(cylinder5);

  const cylinder6 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.5, 16), purple);
  cylinder6.position.set(-5, 0.25, 9);
  cylinder6.castShadow = true;
  cylinder6.receiveShadow = true;
  cylinder6.userData.baseMat = purple;
  scene.add(cylinder6);

  // 6 SPHERES
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), green);
  sphere.position.set(3, 0.7, 0);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  sphere.userData.baseMat = green;
  scene.add(sphere);

  const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), orange);
  sphere2.position.set(1, 0.2, 2);
  sphere2.castShadow = true;
  sphere2.receiveShadow = true;
  sphere2.userData.baseMat = orange;
  scene.add(sphere2);

  const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), blue);
  sphere3.position.set(5, 0.3, 4);
  sphere3.castShadow = true;
  sphere3.receiveShadow = true;
  sphere3.userData.baseMat = blue;
  scene.add(sphere3);

  const sphere4 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), red);
  sphere4.position.set(1, 0.4, 6);
  sphere4.castShadow = true;
  sphere4.receiveShadow = true;
  sphere4.userData.baseMat = red;
  scene.add(sphere4);

  const sphere5 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), yellow);
  sphere5.position.set(-6, 0.5, 1);
  sphere5.castShadow = true;
  sphere5.receiveShadow = true;
  sphere5.userData.baseMat = yellow;
  scene.add(sphere5);

  const sphere6 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), green);
  sphere6.position.set(-6, 0.35, 6);
  sphere6.castShadow = true;
  sphere6.receiveShadow = true;
  sphere6.userData.baseMat = green;
  scene.add(sphere6);

  // GLB 3D Model stuff for the well
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync('well.glb');
  const model = gltf.scene;
  model.position.set(-6, 0, -6);
  model.scale.set(4, 4, 4);
  model.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(model);
}

// tick stuff
function tick() {
  g_seconds = performance.now() / 1000.0 - g_startTime;
  updateAnimationAngles();
  renderScene();
  requestAnimationFrame(tick);
}

// light stuff
function updateAnimationAngles() {
  if (g_lightM) {
    g_lightPos[0] = Math.cos(g_seconds * 0.5) * 10;
    g_lightPos[2] = Math.sin(g_seconds * 0.5) * 10;
    g_lightPos[1] = 8 + Math.sin(g_seconds * 0.25) * 3;
    syncLight();
  }
}

function syncLight() {
  dirLightRef.position.set(...g_lightPos);
  lightMarker.position.set(...g_lightPos);
}

function renderScene() {
  const t0 = performance.now();

  // Global rotation
  scene.rotation.y = THREE.MathUtils.degToRad(g_globalAngle);

  // Normal mode
  scene.traverse(obj => {
    if (!obj.isMesh || obj.userData.baseMat === undefined) return;
    obj.material = g_normal ? matNormal : obj.userData.baseMat;
  });

  // Light on/off
  scene.traverse(obj => {
    if (obj.isDirectionalLight || obj.isHemisphereLight) {
      obj.visible = g_light;
    }
  });

  // Move da cube side to side
  slideCube.position.x = SLIDE_BASE_X + Math.sin(g_seconds * 1.5) * 2;

  camera3.position.copy(g_eye);
  camera3.lookAt(g_at);
  renderer.render(scene, camera3);

  const dur = performance.now() - t0;
  sendTextToHTML('ms: ' + Math.floor(dur) + '  fps: ' + Math.floor(1000/dur*10)/10, 'numdot');
}

// keydown stuff
function keydown(ev) {
  const dir   = new THREE.Vector3().subVectors(g_at, g_eye).normalize();
  const right = new THREE.Vector3().crossVectors(dir, UP).normalize();
  const STEP  = 0.3;

  switch (ev.keyCode) {
    case 87: case 38:
      g_eye.addScaledVector(dir,   STEP); g_at.addScaledVector(dir,   STEP); break;
    case 83: case 40:
      g_eye.addScaledVector(dir,  -STEP); g_at.addScaledVector(dir,  -STEP); break;
    case 65: case 37:
      g_eye.addScaledVector(right,-STEP); g_at.addScaledVector(right,-STEP); break;
    case 68: case 39:
      g_eye.addScaledVector(right, STEP); g_at.addScaledVector(right, STEP); break;
  }
}

// get the stuff from HTML
function addActionsForHtmlUI() {
  document.getElementById('normalOn').onclick  = () => { g_normal = true;  };
  document.getElementById('normalOff').onclick = () => { g_normal = false; };
  document.getElementById('lightOn').onclick   = () => { g_light  = true;  };
  document.getElementById('lightOff').onclick  = () => { g_light  = false; };
  document.getElementById('lightMOn').onclick  = () => { g_lightM = true;  };
  document.getElementById('lightMOff').onclick = () => { g_lightM = false; };

  document.getElementById('angleSlide').addEventListener('mousemove', function() {
    g_globalAngle = this.value;
  });
  document.getElementById('lightSlideX').addEventListener('mousemove', function(ev) {
    if (ev.buttons === 1) { g_lightPos[0] = this.value / 100; syncLight(); }
  });
  document.getElementById('lightSlideY').addEventListener('mousemove', function(ev) {
    if (ev.buttons === 1) { g_lightPos[1] = this.value / 100; syncLight(); }
  });
  document.getElementById('lightSlideZ').addEventListener('mousemove', function(ev) {
    if (ev.buttons === 1) { g_lightPos[2] = this.value / 100; syncLight(); }
  });
}

// mouse
function addMouseOrbit() {
  let lastX = null, lastY = null;

  canvas.addEventListener('mousedown', e => {
    if (e.button === 0) { lastX = e.clientX; lastY = e.clientY; }
  });
  canvas.addEventListener('mousemove', e => {
    if (e.buttons !== 1 || lastX === null) return;
    const dx = (e.clientX - lastX) * 0.005;
    const dy = (e.clientY - lastY) * 0.005;
    lastX = e.clientX; lastY = e.clientY;
    const offset = new THREE.Vector3().subVectors(g_eye, g_at);
    const sph = new THREE.Spherical().setFromVector3(offset);
    sph.theta -= dx;
    sph.phi = Math.max(0.05, Math.min(Math.PI - 0.05, sph.phi + dy));
    g_eye.setFromSpherical(sph).add(g_at);
  });
  canvas.addEventListener('mouseup', () => { lastX = null; });
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const dir  = new THREE.Vector3().subVectors(g_at, g_eye).normalize();
    const dist = g_eye.distanceTo(g_at);
    g_eye.addScaledVector(dir, Math.sign(e.deltaY) * Math.max(0.1, dist * 0.06));
  }, { passive: false });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
}

function sendTextToHTML(text, htmlID) {
  const el = document.getElementById(htmlID);
  if (!el) { console.log('Failed to get ' + htmlID + ' from HTML'); return; }
  el.innerHTML = text;
}

main();
