<!--  -->
<template>
  <PointSphere class="pointSphere"></PointSphere>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
// import gui from '@/three/gui';
import scene from '@/three/scene'
import axesHelper from '@/three/axesHelper';
import camera from "@/three/camera/camera";
import renderer from "@/three/renderer";
import animate from "@/three/animate";
import createMesh from '@/three/createMesh';
import init from '@/three/init';
import PointSphere from "./PointSphere.vue";

init()
// 场景元素div
let sceneDiv = ref(null)
// 添加相机
scene.add(camera);
scene.add(axesHelper);
createMesh()
onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
});

</script>
<style scoped lang="less">
.pointSphere{
  position: fixed;
  width: 30vw;
  height: 25vw;
  top: 0;
  left: 0;
  background: transparent;
}
/* @import url(); 引入css类 */
</style>@/three/camera/camera