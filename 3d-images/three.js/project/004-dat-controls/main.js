
let controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03
}



function init() {

    const renderer = initRenderer();
    const scene = initScene();
    const camera = initCamera();
    const stats = initStats();

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

    const trackballControls = initTrackballControls(camera, renderer);
    const clock = new THREE.Clock();

    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 1);
    gui.add(controls, 'bouncingSpeed', 0, 1);

    let step=0;
    function renderScene() {
        stats.update();
        trackballControls.update(clock.getDelta());
    
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step+=controls.bouncingSpeed;
        sphere.position.x = 20 + 10*(Math.cos(step));
        sphere.position.y = 2 + 10*Math.abs(Math.sin(step));
    
    
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    renderScene();


    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }  
    window.addEventListener('resize', onResize, false);
}




function initRenderer() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    return renderer;
}

function initScene() {
    let scene = new THREE.Scene();
    // let axes = new THREE.AxesHelper(20);
    // scene.add(axes);
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

function initStats(type) {
    //DOCS https://github.com/mrdoob/stats.js/
    var panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    var stats = new Stats();
    stats.showPanel(panelType); // 0: fps, 1: ms
    document.body.appendChild(stats.dom);
    return stats;
}

function initTrackballControls(camera, renderer) {
    //DOCS https://threejs.org/docs/#examples/en/controls/TrackballControls
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.staticMoving = true;
    return trackballControls;
}

  