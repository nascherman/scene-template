const createApp = require('./');
const createLoop = require('raf-loop');
const path = require('path');
global.THREE = require('three');

let geometry = new THREE.SphereGeometry(20, 50, 50);
let mesh1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
  color: 0xff0000
}));
let light = new THREE.AmbientLight(0xffffff, 1.5);

const opts = {
  renderer: {
    antialias: true
  },
  controls: {
    theta: 50 * Math.PI / 180,
    phi: -50 * Math.PI / 180,
    distance: 60
  },
  objects: [
    mesh1,
    light
  ]
}
// Create our basic ThreeJS application
const {
  renderer,
  camera,
  scene,
  updateControls
} = createApp(opts);
// for threejs inspector
window.scene = scene;
// Start our render loop
createLoop((dt) => {
  // update time in seconds
  // material.uniforms.time.value += dt / 1000;
  // render
  updateControls();
  renderer.render(window.scene, camera);
}).start();
