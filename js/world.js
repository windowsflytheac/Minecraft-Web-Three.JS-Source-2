export function initWorld(THREE) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100),
    new THREE.MeshStandardMaterial({color:0x228b22})
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // Lights
  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(10,10,5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // Movement
  const keys = {};
  const moveSpeed = 0.12;
  document.addEventListener("keydown", e=>keys[e.code]=true);
  document.addEventListener("keyup", e=>keys[e.code]=false);

  function updateMovement() {
    let directionX = Number(keys["KeyD"])-Number(keys["KeyA"]);
    let directionZ = Number(keys["KeyS"])-Number(keys["KeyW"]);

    camera.position.x += directionX * moveSpeed;
    camera.position.z += directionZ * moveSpeed;
  }

  return { scene, camera, renderer, updateMovement };
}
