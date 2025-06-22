import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

// --- Cena Básica ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// --- Luz ---
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 15, 10);
scene.add(light);

// --- Chão ---
const groundGeometry = new THREE.PlaneGeometry(30, 30);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);

// --- Física ---
const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });

const groundPhysMaterial = new CANNON.Material('ground');
const spherePhysMaterial = new CANNON.Material('sphere');

const contactMaterial = new CANNON.ContactMaterial(groundPhysMaterial, spherePhysMaterial, {
  restitution: 0.9
});
world.addContactMaterial(contactMaterial);

const groundBody = new CANNON.Body({
  mass: 0,
  material: groundPhysMaterial,
  shape: new CANNON.Plane()
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// --- Arrays de Esferas ---
const sphereMeshes = [];
const sphereBodies = [];

// --- Função para criar esferas ---
function createSphere() {
  const radius = 1;
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(
    (Math.random() - 0.5) * 20,
    Math.random() * 10 + 5,
    (Math.random() - 0.5) * 20
  );
  scene.add(mesh);
  sphereMeshes.push(mesh);

  const body = new CANNON.Body({
    mass: 1,
    material: spherePhysMaterial,
    shape: new CANNON.Sphere(radius),
    position: new CANNON.Vec3().copy(mesh.position)
  });
  world.addBody(body);
  sphereBodies.push(body);
}

// --- Primeiras Esferas ---
for (let i = 0; i < 5; i++) createSphere();

// --- Raycaster para Clique nas Esferas ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(sphereMeshes);
  if (intersects.length > 0) {
    const index = sphereMeshes.indexOf(intersects[0].object);
    if (index !== -1) {
      // Faz a esfera "pular" ao clique
      sphereBodies[index].velocity.y += 10;
    }
  }
});

// --- Controles de UI ---
document.getElementById('addSphere').addEventListener('click', createSphere);

document.getElementById('applyGravity').addEventListener('click', () => {
  const newGravityY = parseFloat(document.getElementById('gravityY').value);
  world.gravity.set(0, newGravityY, 0);
});

// --- Loop de Animação ---
function animate() {
  requestAnimationFrame(animate);
  world.step(1 / 60);

  sphereMeshes.forEach((mesh, index) => {
    mesh.position.copy(sphereBodies[index].position);
    mesh.quaternion.copy(sphereBodies[index].quaternion);
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

// --- Responsivo ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
