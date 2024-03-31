
import * as THREE from "three";

/******* 
 * @description: 用于为几何体新建边缘的线
 * @return {*}
 */
export default class MeshLine {
  constructor(geometry) {
    const edges = new THREE.EdgesGeometry(geometry);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = edges;
    this.mesh = line;
  }
}
