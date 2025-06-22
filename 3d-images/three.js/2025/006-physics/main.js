import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

// --- Cena 3D ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// --- Câmera ---
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 5, 10);

// --- Renderizador ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Controles ---
const controls = new OrbitControls(camera, renderer.domElement);

// --- Luz ---
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// --- Chão Visual ---
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);

// --- Esfera Visual ---
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 5, 0);
scene.add(sphereMesh);

// --- Mundo de Física ---
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0)
});

// --- Materiais de Física ---
const groundPhysMaterial = new CANNON.Material('groundMaterial');
const spherePhysMaterial = new CANNON.Material('sphereMaterial');

// --- Define a restituição (quique) ---
const contactMaterial = new CANNON.ContactMaterial(
  groundPhysMaterial,
  spherePhysMaterial,
  {
    restitution: 0.8,  // QUANTO A ESFERA VAI QUICAR
  }
);
world.addContactMaterial(contactMaterial);

// --- Body do Chão ---
const groundBody = new CANNON.Body({
  mass: 0,
  material: groundPhysMaterial,
  shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// --- Body da Esfera ---
const sphereBody = new CANNON.Body({
  mass: 1,
  material: spherePhysMaterial,
  shape: new CANNON.Sphere(1),
  position: new CANNON.Vec3(0, 5, 0),
});
world.addBody(sphereBody);

// --- Loop de Animação ---
function animate() {
  requestAnimationFrame(animate);

  world.step(1 / 60);

  // Sincroniza posição da física com o Three.js
  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);

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
