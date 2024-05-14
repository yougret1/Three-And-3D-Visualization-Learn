// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import camera from "../camera/camera";
import {humanCamera} from "@/three/camera/humanCamera";
import renderer from "../renderer";
import * as eventEmitter from "@/emitter/eventEmitter";
import * as THREE from "three";

// 初始化控制器
var controls = new OrbitControls(camera, renderer.domElement);
var humanControls = new PointerLockControls(humanCamera, renderer.domElement);

// 增加鼠标控制速度
humanControls.pointerSpeed = 3.0

var humanActivity = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  moveUp: false,
  moveDown: false,
  rotateLeft: false,
  rotateRight: false,
};

function handleKeyDown(event) {
  switch (event.keyCode) {
    case 87: // w 键
      humanActivity.moveForward = true;
      break;
    case 83: // s 键
      humanActivity.moveBackward = true;
      break;
    case 65: // a 键
      humanActivity.moveLeft = true;
      break;
    case 68: // d 键
      humanActivity.moveRight = true;
      break;
    case 81: // q 键
      humanActivity.moveUp = true;
      break;
    case 69: // e 键
      humanActivity.moveDown = true;
      break;
    case 37: // 左箭头
      humanActivity.rotateLeft = true;
      break;
    case 39: // 右箭头
      humanActivity.rotateRight = true;
      break;
  }
}

function handleKeyUp(event) {
  // console.log(event.keyCode);
  switch (event.keyCode) {
    case 87: // w 键
      humanActivity.moveForward = false;
      break;
    case 83: // s 键
      humanActivity.moveBackward = false;
      break;
    case 65: // a 键
      humanActivity.moveLeft = false;
      break;
    case 68: // d 键
      humanActivity.moveRight = false;
      break;
    case 81: // q 键
      humanActivity.moveUp = false;
      break;
    case 69: // e 键
      humanActivity.moveDown = false;
      break;
    case 37: // 左箭头
      humanActivity.rotateLeft = false;
      break;
    case 39: // 右箭头
      humanActivity.rotateRight = false;
      break;
  }
}

// 设置控制器阻尼
controls.enableDamping = true;
humanControls.enableDamping = true;
// 控制
controls.enabled = true;
humanControls.enabled = false;
humanControls.isLocked = true;

function switchCameraControl(param) {
  if (!humanControls.enabled) {
    window.addEventListener("keydown", handleKeyDown); // 添加键盘事件监听器
    window.addEventListener("keyup", handleKeyUp); // 添加键盘事件监听器
    humanControls.enabled = true;
    controls.enabled = false;
  } else {
    window.removeEventListener("keydown", handleKeyDown); // 在组件销毁前移除事件监听器
    window.removeEventListener("keyup", handleKeyUp); // 添加键盘事件监听器
    humanControls.enabled = false;
    controls.enabled = true;
  }
}
eventEmitter.on("human-view", (event) => {
  switchCameraControl();
});

export { controls, humanControls ,humanActivity };
