/*
  This is a generic "ThreeJS Application"
  helper which sets up a renderer and camera
  controls.
 */
function createApp (opt = {}, THREE) {
  const createOrbitControls = require('orbit-controls');
  require('three-first-person-controls')(THREE);
  require('three-fly-controls')(THREE);
  const assign = require('object-assign');
  let controls, clock;
  const dpr = window.devicePixelRatio;
  const renderer = new THREE.WebGLRenderer(assign({
    antialias: true // default enabled
  }, opt.renderer));
  renderer.setPixelRatio(dpr);
  // Show the <canvas> on screen
  const canvas = renderer.domElement;
  if(opt.domElement) {
    opt.domElement.appendChild(canvas);
  }
  else {
    document.body.appendChild(canvas);
  }
  // 3D camera looking
  const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 1000);
  const target = new THREE.Vector3();
  // 3D scene
  const scene = opt.scene ? opt.scene : new THREE.Scene();
  
  if (opt.controls.type === 'fly'){
    controls = new THREE.FlyControls(camera);
    clock =  new THREE.Clock();
    assign(controls, {
      movementSpeed: 10.0,
      domElement: canvas,
      rollSpeed: Math.PI / 36,
      autoForward: false,
      dragToLook: true
    });
  }
  else if (opt.controls.type === 'first-person') {
    controls = new THREE.FirstPersonControls(camera);
    clock =  new THREE.Clock();
    assign(controls, {
      lookSpeed: 0.4,
      movementSpeed: 20,
      noFly: true,
      lookVertical: true,
      constraintVertical: true,
      verticalMin: 1.0,
      verticalMax: 2.0,
      lon: -150,
      lat: 120
    });
  }
  else if(opt.controls.type === 'orbit'){
    // 3D orbit controller with damping
    controls = createOrbitControls(assign({
    canvas,
      theta: 40 * Math.PI / 180,
      phi: -60 * Math.PI / 180,
      distance: 75
    }, opt.controls));
  }
  else throw new Error('You must specify a control type');

  var updateControls = opt.controls.type === 'orbit' ? updateControlsOrbit : updateControls;
  // Update frame size
  window.addEventListener('resize', resize);
  // Setup initial size
  resize();
  // add any initial meshes
  addMeshes(opt.objects);
  return {
    updateControls,
    camera,
    scene,
    renderer,
    controls,
    canvas
  };

  function updateControlsOrbit () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    // update camera controls
    controls.update();
    camera.position.fromArray(controls.position);
    camera.up.fromArray(controls.up);
    camera.lookAt(target.fromArray(controls.direction));
    // Update camera matrices
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }

  function updateControls () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    // update camera controls
    var delta = clock.getDelta();
    controls.update(delta);
  }

  function resize () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateControls();
  }

  function addMeshes(objects = []) {
    objects.forEach(function(obj) {
      scene.add(obj);
    })
  }

}

module.exports = createApp;