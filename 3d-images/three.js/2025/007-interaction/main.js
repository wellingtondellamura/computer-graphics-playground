import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

// --- Setup da Cena ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// --- Luz ---
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 15, 10);
scene.add(light);

// --- Chão Visual ---
const groundGeometry = new THREE.PlaneGeometry(30, 30);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);

// --- Mundo de Física ---
const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });

// --- Materiais de Física ---
const groundMaterialPhys = new CANNON.Material('ground');
const sphereMaterialPhys = new CANNON.Material('sphere');

// --- Contact Material (Configura o Bounce) ---
const contactMaterial = new CANNON.ContactMaterial(
  groundMaterialPhys,
  sphereMaterialPhys,
  {
    restitution: 0.9,  // QUIQUE FORTE!
    friction: 0.1
  }
);
world.addContactMaterial(contactMaterial);

// --- Body do Chão ---
const groundBody = new CANNON.Body({
  mass: 0,
  material: groundMaterialPhys,
  shape: new CANNON.Plane()
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// --- Arrays de Meshes e Bodies das Esferas ---
const sphereMeshes = [];
const sphereBodies = [];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereVisualMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 });

// --- Criar várias esferas ---
for (let i = 0; i < 10; i++) {
  // Esfera Visual
  const mesh = new THREE.Mesh(sphereGeometry, sphereVisualMaterial.clone());
  mesh.material.color.setHSL(Math.random(), 1, 0.5);  // Cores diferentes
  scene.add(mesh);
  sphereMeshes.push(mesh);

  // Body Física
  const body = new CANNON.Body({
    mass: 1,
    material: sphereMaterialPhys,
    shape: new CANNON.Sphere(1),
    position: new CANNON.Vec3(
      (Math.random() - 0.5) * 20,
      Math.random() * 10 + 5,
      (Math.random() - 0.5) * 20
    )
  });

  // Adiciona uma velocidade inicial aleatória
  body.velocity.set(
    (Math.random() - 0.5) * 5,
    Math.random() * 5,
    (Math.random() - 0.5) * 5
  );

  world.addBody(body);
  sphereBodies.push(body);
}

// --- Loop de Animação ---
function animate() {
  requestAnimationFrame(animate);

  world.step(1 / 60);

  // Atualizar todas as esferas
  sphereMeshes.forEach((mesh, index) => {
    mesh.position.copy(sphereBodies[index].position);
    mesh.quaternion.copy(sphereBodies[index].quaternion);
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

// --- Responsividade ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
