import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";
import { PointerLockControls } from "https://unpkg.com/three@0.165.0/examples/jsm/controls/PointerLockControls.js";
import { createWorld } from "./world.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera, renderer.domElement);
document.body.addEventListener("click", () => controls.lock());
scene.add(controls.getObject());

const world = createWorld(scene);

camera.position.y = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
