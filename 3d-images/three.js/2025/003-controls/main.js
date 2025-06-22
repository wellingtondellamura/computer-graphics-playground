import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const cameraParams = {
  fov: 75,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000
}
const camera = new THREE.PerspectiveCamera( cameraParams.fov, cameraParams.aspect, 
                                            cameraParams.near, cameraParams.far );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop(animate);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1, 10, 10, 10 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } ); // Changed to MeshStandardMaterial
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set(5, 5, 5).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight( 0x404040 ); // Soft white light
scene.add(ambientLight);


// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false; // prevent panning up and down
controls.maxPolarAngle = Math.PI / 2; // limit vertical rotation to prevent flipping
controls.minDistance = 2; // prevent zooming too close
controls.maxDistance = 10; // prevent zooming too far away
controls.update(); 

//show the axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//show the camera 
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

//show the light
const lightHelper = new THREE.DirectionalLightHelper(light, 1);
scene.add(lightHelper);



function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}
