import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/controls/PointerLockControls.js";

// --- Scene ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Ground ---
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x228b22 })
);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// --- Lighting ---
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10,10,5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// --- Controls ---
const controls = new PointerLockControls(camera, document.body);
document.addEventListener("click", () => controls.lock());

// --- Movement ---
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const moveSpeed = 0.12;
const keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function updateControls() {
  if (!controls.isLocked) return;
  direction.z = Number(keys["KeyW"]) - Number(keys["KeyS"]);
  direction.x = Number(keys["KeyD"]) - Number(keys["KeyA"]);
  direction.normalize();
  if (direction.length() > 0) {
    velocity.z = -direction.z * moveSpeed;
    velocity.x = -direction.x * moveSpeed;
    controls.moveRight(-velocity.x);
    controls.moveForward(-velocity.z);
  }
}

// --- Animate ---
function animate() {
  requestAnimationFrame(animate);
  updateControls();
  renderer.render(scene, camera);
}
animate();

// --- Responsive ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log("Minecraft Web (Three.JS: Source 2) initialized!");
