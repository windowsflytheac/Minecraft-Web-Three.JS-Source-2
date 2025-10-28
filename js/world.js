import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

export function createWorld(scene) {
  const size = 16;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x4caf50 }),
    new THREE.MeshStandardMaterial({ color: 0x8d6e63 }),
    new THREE.MeshStandardMaterial({ color: 0x9e9e9e })
  ];

  const group = new THREE.Group();
  for (let x = -size / 2; x < size / 2; x++) {
    for (let z = -size / 2; z < size / 2; z++) {
      const y = Math.floor(Math.random() * 3);
      const mat = materials[Math.floor(Math.random() * materials.length)];
      const block = new THREE.Mesh(geometry, mat);
      block.position.set(x, y, z);
      group.add(block);
    }
  }

  scene.add(group);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  return group;
}
