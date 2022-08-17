

function init() {

    const renderer = initRenderer();
    const scene = initScene();
    const camera = initCamera();
    const stats = initStats();

    //scene.fog = new THREE.Fog(0xffffff, 10, 100);//linear
    scene.fog = new THREE.FogExp2( 0xffffff, 0.01 );//exponencial

    let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    let plane = new THREE.Mesh(
        planeGeometry,
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    scene.add(plane);

    camera.lookAt(scene.position);
    let spotLight = initSpotLight();
    scene.add(spotLight);

    let ambientLight = new THREE.AmbientLight(0x3c3c3c);
    scene.add(ambientLight);

    document.getElementById("webgloutput").appendChild(renderer.domElement);

    const trackballControls = initTrackballControls(camera, renderer);
    const clock = new THREE.Clock();


    let controls = {
        rotationSpeed: 0.02,
        numberOfObjects: scene.children.length,
        removeCube: function () {
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        },
    
        addCube: function () {
    
            var cubeSize = Math.ceil((Math.random() * 3));
            var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffff
            });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            cube.name = "cube-" + scene.children.length;
    
            cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
            cube.position.y = Math.round((Math.random() * 5));
            cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
            console.log('Created cube with name: ' + cube.name);
        }
    }
    
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'numberOfObjects').listen();

    let step = 0;
    function renderScene() {
        stats.update();
        trackballControls.update(clock.getDelta());

        scene.traverse(function (e) {
            if (e instanceof THREE.Mesh && e != plane) {
                e.rotation.x += controls.rotationSpeed;
                e.rotation.y += controls.rotationSpeed;
                e.rotation.z += controls.rotationSpeed;
            }
        });


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
    let spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
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
