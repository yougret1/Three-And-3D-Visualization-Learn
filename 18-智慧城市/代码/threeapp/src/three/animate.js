import * as THREE from "three"
import camera from "./camera"
import renderer from "./renderer"
import scene from "./scene"
import controls from "./controls";

const clock = new THREE.Clock();
function animate(t) {  
  controls.update();
  const time = clock.getElapsedTime();
  requestAnimationFrame(animate)
  // 渲染
  renderer.render(scene,camera)
}
export default animate