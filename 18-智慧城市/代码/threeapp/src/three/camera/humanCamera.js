import * as THREE from "three";

const humanCamera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  50
);
var eyeHeight = 0.3;
humanCamera.position.set(0, eyeHeight, 1);

export { humanCamera, eyeHeight };
