function init() {
    
    const renderer = initRenderer();
    const scene = initScene();
    const camera = initCamera();

    let plane = new THREE.Mesh(
            new THREE.PlaneGeometry(60, 20), 
            new THREE.MeshLambertMaterial({ color: 0xAAAAAA })
    );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;
    scene.add(plane);
 
    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),
        new THREE.MeshLambertMaterial({ color: 0xFF0000 })
    );
    cube.position.set(-4, 3, 0);
    cube.castShadow = true;
    scene.add(cube);
    
    let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4, 20, 20),
        new THREE.MeshLambertMaterial({ color: 0x7777FF })
    );                
    sphere.position.set(20, 4, 2);
    sphere.castShadow = true;
    scene.add(sphere);
    
    camera.lookAt(scene.position);
    
    let spotLight = initSpotLight();
    scene.add(spotLight);

    document.getElementById("webgloutput").appendChild(renderer.domElement);
    
    renderer.render(scene, camera);
}

function initRenderer() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.Enabled = true;
    return renderer;
}

function initScene() {
    let scene = new THREE.Scene();
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);
    return scene;
}

function initCamera() {
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight; 
    const near = 0.1;
    const far = 1000;
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-30, 40, 30);
    return camera;
}

function initSpotLight() {
    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    return spotLight;
}