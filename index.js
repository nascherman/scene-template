
/*
  This is a generic "ThreeJS Application"
  helper which sets up a renderer and camera
  controls.
 */
const createControls = require('orbit-controls');
const assign = require('object-assign');
const THREE = require('three')

function createApp (opt = {}) {
  const dpr = window.devicePixelRatio;
  const renderer = new THREE.WebGLRenderer(assign({
    antialias: true // default enabled
  }, opt.renderer));
  renderer.setPixelRatio(dpr);
  // Show the <canvas> on screen
  const canvas = renderer.domElement;
  if(opt.domElement) {
    domElement.appendChild(canvas);
  }
  else {
    document.body.appendChild(canvas);
  }
  // 3D camera looking
  const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 1000);
  const target = new THREE.Vector3();
  // 3D scene
  const scene = new THREE.Scene();
  // 3D orbit controller with damping
  const controls = createControls(assign({
    canvas,
    theta: 40 * Math.PI / 180,
    phi: -60 * Math.PI / 180,
    distance: 75
  }, opt.controls));
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

  function updateControls () {
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