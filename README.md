# scene-template


A threejs scene template based on work by [@mattdesl](https://twitter.com/mattdesl). Used to quickly generate a scene for demos or other. 

## Usage

```javascript
var createApp = require('scene-template');
```

#### Control Options 
controls options can be passed into the createApp({}) method as `controls`

`type`
  - can be `orbit`, `first-person`, or `fly` controls.
  ##### `orbit`
    - `position` the initial position of the camera, default `[0, 0, 1]`
    - `up` the initial direction of the camera, default `[0, 1, 0]`
    - `target` the center of the orbit, default `[0, 0, 0]`
    - `phi` the initial rotation in radians, phi in spherical coordinates, default `Math.PI/2`
    - `theta` the initial rotation in radians, theta in spherical coordinates, default `0`
    - `distance` the distance from the target, default `1`
    - `damping` how fast the controls slow down, between `0` and `1`, default `0.25`
    - `rotateSpeed` the speed of the rotation, default `0.28`
    - `zoomSpeed` the speed of the zoom, default `0.0075`
    - `pinchSpeed` (coming soon) the speed of the pinch, default `0.0075`
    - `pinch` (coming soon) enable pinching, default `true`
    - `zoom` enable zooming, default `true`
    - `rotate` enable rotating, default `true`
    - `phiBounds` the bounds of the phi rotation, default `[0, Math.PI]`
    - `thetaBounds` the bounds of the theta rotation, default `[-Infinity, Infinity]`
    - `distanceBounds` the bounds of the distance, default `[0, Infinity]`
    - `parent` the parent element, default `window`
    - `element` the element, default `window`

  ##### `fly` - can set the regular options of THREE.FlyControls including:
    - `movementSpeed` 
    - `domElement` 
    - `rollSpeed`
    - `autoForward`
    - `dragToLook`

  ##### `first-person` - can set the options available to THREE.FirstPersonControls
    - `lookSpeed`
    - `movement`
    - `noFly`
    - `lookVertical`
    - `constrainVertical`
    - `verticalMin`
    - `verticalMax`
    -  `lon`, `lat`

Pass in options for the renderer, controls and any initial objects.

```javascript
opts = {
  // pass in options to the webgl renderer
  renderer: {
    antialias: true
  },
  // controls. Can be 'fly' or 'first-person' controls as well 
  controls: {
    type: 'orbit', 
    theta: 50 * Math.PI / 180,
    phi: -50 * Math.PI / 180,
    distance: 60
  },
  // add any initial objects to the scene if you want
  objects: [
    mesh1,
    light
  ]
}
```

You can retrieve a reference to the scene objects from the create method
```javascript
const {
  renderer,
  camera,
  scene,
  updateControls
} = createApp(opts);
```
