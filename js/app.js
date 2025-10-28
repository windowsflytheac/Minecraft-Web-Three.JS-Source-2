// === Three.JS: Source 2 - Minecraft Web Edition ===
// Safe for GitHub Pages & browsers without bundlers.

// Load Three.js and controls directly from a CDN
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { PointerLockControls } from "./lib/PointerLockControls.js";

// === Basic Scene Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // nice sky blue

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// === Renderer ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Lighting ===
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// === Ground ===
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// === Player Controls ===
const controls = new PointerLockControls(camera, document.body);
document.addEventListener("click", () => {
  controls.lock();
});

controls.addEventListener("lock", () => console.log("Pointer locked!"));
controls.addEventListener("unlock", () => console.log("Pointer unlocked!"));

// === Movement Logic ===
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const moveSpeed = 0.12;

const keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

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

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);
  updateControls();
  renderer.render(scene, camera);
}
animate();

// === Responsive Resize ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// === End of File ===
console.log("Minecraft Web (Three.JS: Source 2) initialized successfully!");
