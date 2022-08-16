function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = canvas.width / canvas.height;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();



  scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(15, 32, 16),
    new THREE.MeshPhongMaterial({ color: 0xffffff })
  )
);



  const boxWidth = 2;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
  // const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
  // const torus = new THREE.Mesh(geometry1, material1);
  // scene.add(torus);


  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(1, 2, 4);
  scene.add(light);

  function render(time) {
    time *= 0.001;  // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;
    cube.rotation.z = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

main();
