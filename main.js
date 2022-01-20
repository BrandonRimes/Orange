import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Threejs setup
// -- Scene
const scene = new THREE.Scene();
// -- Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);
// -- Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#theCanvas'),
  alpha: true
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Sphere
const sphere0Norm = new THREE.TextureLoader().load('./img/normalTile.jpg')
const sphere0 = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    normalMap: sphere0Norm,
    wireframe: false,
    castShadow: true,
    metalness: 0.5,
    roughness: 0.5
  })
);
scene.add(sphere0);

// Lights
// -- Light0
const pointLight0 = new THREE.PointLight(0xff1493, 1, 100);
pointLight0.position.set(20,-10,10);
pointLight0.castShadow = true;
// -- Light1
const pointLight1 = new THREE.PointLight(0x00bfff);
pointLight1.position.set(-20,10,10);
// -- Ambient
const ambientLight0 = new THREE.AmbientLight(0xffebcd);
// -- Helpers
const lightHelper0 = new THREE.PointLightHelper(pointLight0);
const lightHelper1 = new THREE.PointLightHelper(pointLight1);
// -- Add to scene
scene.add(pointLight0, pointLight1);
// scene.add(lightHelper0, lightHelper1);

// Moveable camera (click/drag)
// const controls = new OrbitControls(camera, renderer.domElement);

// Light follows cursor
function moveLight(e) {
  e.preventDefault();
  const mouseX = (e.pageX / window.innerWidth) * 2 - 1;
  const mouseY = - (e.pageY / window.innerHeight) * 2 + 1;
  const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
  vector.unproject(camera);
  const dir = vector.sub(camera.position).normalize();
  const distance = - camera.position.z / dir.z;
  const pos = camera.position.clone().add(dir.multiplyScalar(distance));
  pointLight0.position.set(pos.x, pos.y, pos.z + 15);
}
document.body.onmousemove = moveLight;

// Render
function animate() {
  requestAnimationFrame(animate);

  sphere0.rotation.x += 0.01;
  sphere0.rotation.y += 0.01;
  sphere0.position.z += 0.00;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// Cursor
const cursor = document.getElementById('cursor');

window.addEventListener('mousemove', moveCursor);

function moveCursor(e) {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
}
