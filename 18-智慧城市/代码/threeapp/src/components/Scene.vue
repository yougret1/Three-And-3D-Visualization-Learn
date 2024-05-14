<template>
  <PointSphere class="pointSphere"></PointSphere>
  <div class="shareList">
    <el-table :data="tableData" style="width: 100%" height="250">
      <el-table-column
        align="center"
        fixed
        prop="name"
        label="地名"
        width="150"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="waterLevel"
        label="水位"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="rainfall"
        label="降雨量"
        width="120"
      >
      </el-table-column>
    </el-table>
  </div>

  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
// import gui from '@/three/gui';
import scene from "@/three/scene";
import axesHelper from "@/three/axesHelper";
import camera from "@/three/camera/camera";
import renderer from "@/three/renderer";
import animate from "@/three/animate";
import createMesh from "@/three/createMesh";
import init from "@/three/init";
import PointSphere from "./PointSphere.vue";

const tableData = ref([
  {
    name: "博成桥",
    waterLevel: "1.52米",
    rainfall: "10mm",
  },
  {
    name: "南星桥",
    waterLevel: "1.62米",
    rainfall: "10mm",
  },
  {
    name: "冬装",
    waterLevel: "1.54米",
    rainfall: "12mm",
  },
  {
    name: "豆腐桥",
    waterLevel: "1.58米",
    rainfall: "15mm",
  },
  {
    name: "博成桥",
    waterLevel: "1.59米",
    rainfall: "20mm",
  },
]);

init();
// 场景元素div
let sceneDiv = ref(null);
// 添加相机
scene.add(camera);
scene.add(axesHelper);
createMesh();
onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
});
</script>
<style scoped lang="less">
.pointSphere {
  position: fixed;
  width: 30vw;
  height: 25vw;
  top: 0;
  left: 0;
  background: transparent;
}
/* @import url(); 引入css类 */
.shareList {
  position: fixed;
  width: 30vw;
  height: 25vw;
  top: 0;
  right: 0;
  // background: transparent;
}
// .el-table tbody tr:hover > td {
//   background-color: transparent !important;
// }
// .el-table__fixed-right tbody tr:hovor > td {
//   background-color: transparent !important;
// }

// .el-table__header-wrapper tr th.el-table-fixed-column--left, .el-table__header-wrapper tr th.el-table-fixed-column--right {
//   background-color: transparent !important;
// }
// .el-table{
//   background-color: transparent !important;
// }
</style>
