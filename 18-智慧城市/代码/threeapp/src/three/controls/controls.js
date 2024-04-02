// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import camera from "../camera/camera";
import humanCamera from "@/three/camera/humanCamera";
import renderer from "../renderer";
import * as eventEmitter from "@/emitter/eventEmitter";
import * as THREE from "three";

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement);

const humanControls = new OrbitControls(humanCamera, renderer.domElement);
humanControls.target.copy(humanCamera.position);
const angle = Math.PI / 180;
const currentDirection = new THREE.Vector3();
function handleKeyDown(event) {
  humanCamera.getWorldDirection(currentDirection);
  console.log(currentDirection);
  // currentDirection.applyQuaternion(camera.quaternion); //将朝向向量转换为相机坐标系中的方向
  const speed = 1; // 移动速度
  switch (event.key) {
    case "w":
      humanCamera.position.add(currentDirection.multiplyScalar(speed));
      // humanCamera.lookAt(currentDirection);
      humanControls.target.copy(humanCamera.position);
      break;
    case "s":
      humanCamera.position.add(currentDirection.multiplyScalar(-speed));
      humanControls.target.copy(humanCamera.position);
      break;
    case "a":
      humanCamera.position.add(
        currentDirection.cross(humanCamera.up).multiplyScalar(-speed)
      );
      humanControls.target.copy(humanCamera.position);
      break;
    case "d":
      humanCamera.position.add(
        currentDirection.cross(humanCamera.up).multiplyScalar(speed)
      );
      humanControls.target.copy(humanCamera.position);
      break;
    case "q":
      // 向左旋转
      // humanCamera.rotation.y += Math.PI / 180;
      break;
    case "e":
      // 向右旋转
      rotateCamera(0.1);
      break;
    // 其他按键处理
  }
}
/**
 *@Description: 旋转相机
 *@MethodAuthor: Yougret
 *@Date: 2024-04-01 20:10:36
*/
function rotateCamera(angle) {
  const yAxis = new THREE.Vector3(0, 1, 0);
  humanCamera.rotateOnWorldAxis(yAxis, angle);
}

// 设置控制器阻尼
controls.enableDamping = true;
humanControls.enableDamping = true;
// 控制
controls.enabled = true;
humanControls.enabled = false;
// 设置自动旋转
// controls.autoRotate = true;
function switchCameraControl(param) {
  console.log(123);
  if (!humanControls.enabled) {
    window.addEventListener("keydown", handleKeyDown); // 添加键盘事件监听器
    humanControls.enabled = true;
    controls.enabled = false;
  } else {
    window.removeEventListener("keydown", handleKeyDown); // 在组件销毁前移除事件监听器
    humanControls.enabled = false;
    controls.enabled = true;
  }
}
eventEmitter.on("human-view", (event) => {
  switchCameraControl();
});

export { controls, humanControls };
