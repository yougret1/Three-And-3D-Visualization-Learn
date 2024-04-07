// 设置摄像头和渲染器的实时监听屏幕大小变化

import camera from "./camera/camera"
import { humanCamera } from "./camera/humanCamera";
import renderer from './renderer'


export default ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  
  // 监听屏幕大小改变的变化，设置渲染的尺寸
  window.addEventListener("resize",()=>{
    console.log("resize");
  
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

  
    humanCamera.aspect = window.innerWidth / window.innerHeight;
    humanCamera.updateProjectionMatrix();
  
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    renderer.setPixelRatio(window.devicePixelRatio)
  
  })
  
} 