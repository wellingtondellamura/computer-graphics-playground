import * as THREE from 'three';

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


function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}

//show the axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//show the camera 
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

//show the light
const lightHelper = new THREE.DirectionalLightHelper(light, 1);
scene.add(lightHelper);

