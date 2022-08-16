function init() {
    
    const renderer = initRenderer();
    const scene = initScene();
    const camera = initCamera();

    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(60, 20), 
            new THREE.MeshBasicMaterial({ color: 0xAAAAAA })
    );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);
    
    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),
        new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true })
    );
    cube.position.set(-4, 3, 0);
    scene.add(cube);
    
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x7777FF, wireframe: true })
    );                
    sphere.position.set(20, 4, 2);
    scene.add(sphere);
    
    camera.lookAt(scene.position);
    
    document.getElementById("webgloutput").appendChild(renderer.domElement);
    
    renderer.render(scene, camera);
}

function initRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

function initScene() {
    var scene = new THREE.Scene();
    var axes = new THREE.AxesHelper(20);
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