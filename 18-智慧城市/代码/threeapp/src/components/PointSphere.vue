<!--  -->
<template>
  <div id="pointSphere"></div>
</template>

<script>
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  mounted() {
    const poi = document.getElementById('pointSphere')
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      poi.clientWidth / poi.clientHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(poi.clientWidth, poi.clientHeight);
    renderer.setClearColor(0x000000, 0)
    poi.appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);

    var gui = new dat.GUI();
    var params = {
      numberOfPoints: 25,
      alpha: 10.0,
    };
    var folder = gui.addFolder("Parameters");
    folder.add(params, "numberOfPoints", 1, 50).step(1).name("Number of Points");
    folder.add(params, "alpha", 0.1, 50).step(1).name("Alpha");
    folder.hide();

    var points = [];

    var radius = 10;

    /**
     *@Description: 随机放置点，点呈球形分布
     *@param numberOfPoints: 点数量W
     */
    function setPoint(numberOfPoints) {
      let temi, isCollapseNum;

      points = [];
      let separate = 0;
      for (var i = 0; i < numberOfPoints; i++) {
        var phi = Math.random() * Math.PI;
        var theta = Math.random() * 2 * Math.PI;
        var x = radius * Math.sin(phi) * Math.cos(theta);
        var y = radius * Math.sin(phi) * Math.sin(theta);
        var z = radius * Math.cos(phi);
        if (Math.random() - 0.5 > 0)
          points.push(new THREE.Vector3(x + separate, y + separate, z + separate));
        else
          points.push(new THREE.Vector3(x - separate, y - separate, z - separate));
      }
      //边塌缩
      for (var i = 0; i < points.length; i++) {
        if (points[i] !== null) {
          temi = points[i].clone();
          isCollapseNum = 0;
          for (var j = i + 1; j < points.length; j++) {
            if (points[j] !== null) {
              if (temi.distanceTo(points[j]) < 2) {
                temi = new THREE.Vector3().addVectors(temi, points[j]);
                isCollapseNum++;
                points[j] = null;
              }
            }
          }
          if (isCollapseNum > 0) {
            temi = temi.divideScalar(isCollapseNum + 1);
            points.push(temi);
            points[i] = null;
          }
        }
      }
      //去除数组中的null
      var index = 0;
      for (var i = 0; i < points.length; i++) {
        if (points[i] !== null) {
          points[index] = points[i];
          index++;
        }
      }
      points.length = index;
    }
    //
    setPoint(params.numberOfPoints);
    var pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
    var pointsMaterial = new THREE.PointsMaterial({ color: 0xffff00 });
    var pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);

    // 将点的网格添加到场景中
    scene.add(pointsMesh);
    /**
     *@Description: 通过三个点和半径查找出是否存在外接圆，如果没有则返回false，有的话则返回center中心点
     */
    function findCircleCenter(point1, point2, point3, alpha) {
      var distance1 = point1.distanceTo(point2);
      var distance2 = point3.distanceTo(point2);
      var distance3 = point1.distanceTo(point3);

      var midPoint = new THREE.Vector3(
        (point1.x + point2.x + point3.x) / 3,
        (point1.y + point2.y + point3.y) / 3,
        (point1.z + point2.z + point3.z) / 3
      );

      var plane = new THREE.Plane();
      plane.setFromCoplanarPoints(point1, point2, point3);
      var circleCenter = new THREE.Vector3();
      plane.coplanarPoint(circleCenter);

      var distanceTem = point1.distanceTo(midPoint);
      var distanceSearch;
      if (alpha > distanceTem) {
        distanceSearch = Math.sqrt(Math.pow(alpha, 2) - Math.pow(distanceTem, 2));
      } else {
        return false;
      }

      if (distance1 > 2 * alpha || distance2 > 2 * alpha || distance3 > 2 * alpha) {
        return false;
      }

      var v = new THREE.Vector3();
      var w = new THREE.Vector3();
      v.subVectors(point2, point1);
      w.subVectors(point3, point1);
      var normal = new THREE.Vector3();
      normal.crossVectors(v, w);

      var length = normal.length() / distanceSearch;

      var unitNormal = new THREE.Vector3(
        normal.x / length,
        normal.y / length,
        normal.z / length
      );

      var nearestPoint1 = new THREE.Vector3().addVectors(circleCenter, unitNormal);
      var nearestPoint2 = new THREE.Vector3().subVectors(circleCenter, unitNormal);
      // showPoint(circleCenter);
      // showPointSphere(nearestPoint1,alpha)
      // showPoint(nearestPoint2);
      // showPoint(nearestPoint1);
      // showPointSphere(nearestPoint2,alpha)

      return [nearestPoint1, nearestPoint2];
    }
    /**
     *@Description: alpha_shape,开始计算外轮廓
     *@MethodAuthor: Yougret
     *@Date: 2024-03-30 22:49:17
     */
    function calculateConvexHull(points, alpha) {
      var convexGeometry = new THREE.BufferGeometry();
      var lineVertices = [];

      for (var i = 0; i < points.length; i++) {
        for (var j = i + 1; j < points.length; j++) {
          for (var k = j + 1; k < points.length; k++) {
            var circleCenter = findCircleCenter(
              points[i],
              points[j],
              points[k],
              alpha
            );
            if (circleCenter == false) continue;
            var circleCenter1 = circleCenter[0];
            var circleCenter2 = circleCenter[1];

            var insideCircle1 = true;
            var insideCircle2 = true;

            for (var l = 0; l < points.length; l++) {
              if (l === i || l === j || l == k) continue;
              if (points[l].distanceTo(circleCenter1) < radius) {
                insideCircle1 = false;
              }
              if (points[l].distanceTo(circleCenter2) < radius) {
                insideCircle2 = false;
              }
              if (!insideCircle1 && !insideCircle2) break;
            }
            if (insideCircle1 || insideCircle2) {
              lineVertices.push(points[i].x, points[i].y, points[i].z);
              lineVertices.push(points[j].x, points[j].y, points[j].z);

              lineVertices.push(points[k].x, points[k].y, points[k].z);
              lineVertices.push(points[j].x, points[j].y, points[j].z);

              lineVertices.push(points[k].x, points[k].y, points[k].z);
              lineVertices.push(points[i].x, points[i].y, points[i].z);
            }
          }
        }
      }
      var positionAttribute = new THREE.Float32BufferAttribute(lineVertices, 3);
      convexGeometry.setAttribute("position", positionAttribute);
      return convexGeometry;
    }

    var convexMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
    });
    var convexGeometry = calculateConvexHull(points, params.alpha);
    var convexMesh = new THREE.LineSegments(convexGeometry, convexMaterial);
    scene.add(convexMesh);

    renderer.render(scene, camera);

    function setConvexMesh(value) {
      var newConvexGeometry = calculateConvexHull(points, value);
      convexMesh.geometry = newConvexGeometry;
      renderer.render(scene, camera);
    }

    folder.__controllers[1].onChange((value) => {
      setConvexMesh(value);
      params.alpha = value;
    });
    folder.__controllers[0].onChange((value) => {
      scene.remove(pointsMesh);
      setPoint(value);
      pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
      pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
      scene.add(pointsMesh);
      params.numberOfPoints = value;
      setConvexMesh(params.alpha);
    });

    camera.position.z = 30;
    // 画面尺寸自适应
    const clock = new THREE.Clock();

    let preTime = 0, currTime;
    window.addEventListener("resize", () => {
      // console.log(clock.getElapsedTime());
      currTime = clock.getElapsedTime();
      if (currTime - preTime >= 0.2) {
        preTime = currTime;
        console.log("画面尺寸出现变化");
        camera.aspect = poi.clientWidth / poi.clientHeight;
        // 更新摄像机的投影矩阵
        camera.updateProjectionMatrix();
        // 更新渲染器
        renderer.setSize(poi.clientWidth, poi.clientHeight);
        // 设置渲染器的像素比,从而保证页面不会失真
        renderer.setPixelRatio(window.devicePixelRatio);
      }

    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      scene.rotation.y += 0.01;
      scene.rotation.x += 0.01;
    }
    animate();

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>