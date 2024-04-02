import * as THREE from "three"
import camera from "./camera/camera"
import humanCamera from '@/three/camera/humanCamera'
import renderer from "./renderer"
import scene from "./scene"
import {controls, humanControls}  from "./controls/controls";

const clock = new THREE.Clock();
function animate(t) {  
  if(controls.enabled){
    controls.update();
  }else{
    humanControls.update();
  }



  const time = clock.getElapsedTime();
  requestAnimationFrame(animate)
  // 渲染
  renderer.render(scene,controls.enabled ? camera : humanCamera)
}
export default animate