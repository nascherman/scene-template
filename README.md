# scene-template


A threejs scene template based on work by [@mattdesl](https://twitter.com/mattdesl). Used to quickly generate a scene for demos or other. 

## Usage

```javascript
var createApp = require('scene-template');
```

Pass in options for the renderer, controls and any initial objects.

```javascript
opts = {
  // pass in options to the webgl renderer
  renderer: {
    antialias: true
  },
  // controls for orbit controls
  controls: {
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
