import * as THREE from "three";
import camera from "./camera/camera";
import { humanCamera, eyeHeight } from "@/three/camera/humanCamera";
import renderer from "./renderer";
import scene from "./scene";
import { controls, humanControls, humanActivity } from "./controls/controls";
import City from "@/three/mesh/City";

let city;
var objects = [];

async function init() {
  // 调用City函数获取Object3D
  try {
    city = await City();
    // 将Object3D放入objects数组
    objects.push(city);
    // 在这里可以对city进行其他操作
  } catch (error) {
    // 处理错误
    console.error("Failed to load city:", error);
  }
}

init();
console.log(objects);

var rayCaster = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, -1, 0),
  0,
  //检测10距离
  10
);

/**
 *@Description: 传入角度即方向 判断附近有没有障碍物 返回障碍物数量
 *@MethodAuthor: Yougret
 *@Date: 2024-04-02 15:12:45
 */
const collideCheck = (angle) => {
  let rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationY((angle * Math.PI) / 180);
  const cameraDirection = humanControls
    .getDirection(new THREE.Vector3(0, 0, 0))
    .clone();
  cameraDirection.applyMatrix4(rotationMatrix);
  const rayCaster = new THREE.Raycaster(
    humanControls.getObject().position.clone(),
    cameraDirection,
    0,
    5
  );
  rayCaster.ray.origin.y -= eyeHeight;
  const intersections = rayCaster.intersectObjects(objects, false);
  console.log(intersections)
  return intersections.length;
};
const direction = new THREE.Vector3();
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const color = new THREE.Color();

function animate(t) {
  requestAnimationFrame(animate);
  const time = performance.now();

  if (controls.enabled) {
    controls.update();
  } else {
    if (humanControls.isLocked === true) {
      rayCaster.ray.origin.copy(humanControls.getObject().position);
      rayCaster.ray.origin.y -= eyeHeight; //脚下开始算，=0

      const intersection = rayCaster.intersectObjects(objects, false);

      //四个方位是否产生碰撞
      let leftCollide = false;
      let rightCollide = false;
      let forwardCollide = false;
      let backCollide = false;

      if (humanActivity.moveForward) forwardCollide = collideCheck(0);
      if (humanActivity.moveBackward) backCollide = collideCheck(180);
      if (humanActivity.moveLeft) leftCollide = collideCheck(90);
      if (humanActivity.moveRight) rightCollide = collideCheck(270);

      // 看往那个方向走
      direction.z =
        Number(humanActivity.moveForward) - Number(humanActivity.moveBackward);
      direction.x =
        Number(humanActivity.moveRight) - Number(humanActivity.moveLeft);
      direction.normalize();

      //每一帧的间隔时间 保证相同时间移动相同距离
      const delta = (time - prevTime) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      prevTime = time;
      //按下了前/后
      if (humanActivity.moveForward || humanActivity.moveBackward)
        velocity.z -= direction.z * 400.0 * delta;
      //按下了左/右
      if (humanActivity.moveLeft || humanActivity.moveRight)
        velocity.x -= direction.x * 400.0 * delta;

      //计算移动距离
      let rightDistance = -velocity.x * delta;
      // console.log(rightDistance);
      let forwardDistance = -velocity.z * delta;
      //右侧有障碍物时向右移动 置零
      if (
        (humanActivity.moveRight && rightCollide) ||
        (humanActivity.moveLeft && leftCollide)
      ) {
        rightDistance = 0;
      }
      //前方有障碍物时向前移动 置零
      if (
        (humanActivity.moveForward && forwardCollide) ||
        (humanActivity.moveBackward && backCollide)
      ) {
        forwardDistance = 0;
      }

      //设置最终移动值
      if (humanActivity.moveLeft || humanActivity.moveRight)
        humanControls.moveRight(rightDistance);

      if (humanActivity.moveForward || humanActivity.moveBackward)
        humanControls.moveForward(forwardDistance);
    }
  }

  // 渲染
  renderer.render(scene, controls.enabled ? camera : humanCamera);
}
export default animate;
