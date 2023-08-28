import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Configuração da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Posicionar a câmera
camera.position.z = 5;

// Adiciona OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Adiciona uma luz ambiente
const light = new THREE.AmbientLight(0x404040, 2); // soft white light
scene.add(light);

// Adiciona uma luz direcional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 2);
scene.add(directionalLight);


// carrega o modelo trex/scene.gltf, associa a um objeto chamado trex e adiciona no centro da cena 
const loader = new GLTFLoader();
let trex;
loader.load('trex/scene.gltf', function (gltf) {
    trex = gltf.scene;
    trex.position.set(0, 0, 0);
    scene.add(trex);
    //direciona a luz para o trex
    directionalLight.target = trex;
    console.log(trex);
}, undefined, function (error) {
    console.error(error);
});


// Função de animação
const animate = () => {
    requestAnimationFrame(animate);
    //orbitcontrols
    controls.update();
    // Rotacionar o objeto trex
     //trex.rotation.x += 0.01;
     //trex.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();