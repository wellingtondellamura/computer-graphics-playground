import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';
// Cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);

// Luzes
const ambientLight = new THREE.AmbientLight(0x404040, 2);  // Luz ambiente
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

let mixer;
// Carregamento do GLB
const loader = new GLTFLoader();
loader.load('/phoenix_bird.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(0.01, 0.01, 0.01);
  scene.add(model);
  if (gltf.animations && gltf.animations.length) {
    mixer = new AnimationMixer(model);

    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
    console.log('Animações detectadas:', gltf.animations);
  } else {
    console.log('Sem animações no modelo.');
  }
}, undefined, (error) => {
  console.error('Erro ao carregar GLB:', error);
});

// Adicionando um plano para o chão
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotaciona o plano para ficar horizontal
plane.position.y = -0.01; // Levemente acima do zero para evitar clipping
scene.add(plane);

const clock = new THREE.Clock();

// Loop de animação
function animate() {
  const delta = clock.getDelta(); // Tempo desde o último frame
  if (mixer) mixer.update(delta); // Atualiza o mixer se existir

  controls.update();
  renderer.render(scene, camera);
}

// Responsividade
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
