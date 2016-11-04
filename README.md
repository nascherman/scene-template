# scene-template

A threejs scene template based on work by [@mattdesl](https://twitter.com/mattdesl). Used to quickly generate a scene for demos or other. 

## Usage

```javascript
var createApp = require('scene-template');
```

   can be `orbit`, `first-person`, or `fly` controls. with the corresponding options

Pass in options for the renderer, controls and any initial objects.

```javascript
opts = {
  // pass in options to the webgl renderer
  renderer: {
    antialias: true
  },
  width: 500, // dimensions of the renderer, defaults to window size
  height: 500,
  // controls. Can be 'fly' or 'first-person' controls as well 
  controls: {
    type: 'orbit', 
    theta: 50 * Math.PI / 180,
    phi: -50 * Math.PI / 180,
    distance: 60
  },
  domElement: document.body,
  // add any initial objects to the scene
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
} = createApp(opts, THREE);
```
