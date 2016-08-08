global.THREE = require('three');
require('three-first-person-controls')(THREE);

const createApp = require('./');
const createLoop = require('raf-loop');
const path = require('path');
const MTLLoader = require('three-mtl-loader');
const OBJLoader = require('jser-three-obj-loader')(THREE);
const mtlLoader = new MTLLoader();
let loader = new THREE.OBJLoader();
mtlLoader.setBaseUrl('./assets/');
mtlLoader.setPath('./assets/');
let light = new THREE.AmbientLight(0xffffff, 1.5);
mtlLoader.load('spider.mtl', (matl) => {
  matl.preload();
  loader.setMaterials(matl);
  loader.load('./assets/spider.obj', function(obj) {
    createScene(obj);
  });
});

function createScene(obj) {

  const opts = {
    renderer: {
      antialias: true
    },
    controls: {
      type: 'orbit'
    },
    objects: [
      obj,
      light
    ],
    camera: {
      far: 100000
    }
  };
  // Create our basic ThreeJS application
  const {
    renderer,
    camera,
    scene,
    updateControls
  } = createApp(opts);
  camera.far = 10000;
  // for threejs inspector
  window.scene = scene;
  renderer.setClearColor(0xffffff);
  // Start our render loop
  createLoop((dt) => {
    // update time in seconds
    // material.uniforms.time.value += dt / 1000;
    // render
    updateControls();
    renderer.render(scene, camera);
  }).start();
}
