import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x228b22 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Simple movement
const keys = {};
const moveSpeed = 0.12;
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function updateMovement() {
  let directionX = Number(keys["KeyD"]) - Number(keys["KeyA"]);
  let directionZ = Number(keys["KeyS"]) - Number(keys["KeyW"]);

  camera.position.x += directionX * moveSpeed;
  camera.position.z += directionZ * moveSpeed;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  updateMovement();
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log("Minecraft Web initialized without PointerLockControls!");
