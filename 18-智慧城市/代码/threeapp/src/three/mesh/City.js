import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import MeshLine from './MeshLine'
import scene from "../scene";
import modifyCityMaterial from "../modify/modifyCityMaterial";


export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/zjweu_not_sut_up_smallest.glb", (gltf) => {
    gltf.scene.traverse((item) => {
      console.log(item);
      if (item.type == "Mesh" || item.type == "Object3D") {
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xe33),
        });
        item.material = cityMaterial;
        modifyCityMaterial(item)
        if (item.name == "Areasbuilding" || 
        item.name == "EXPORT_OSM_MAPNIK_WM" ||
        item.name == "Areaslanduse" ||
        item.name == "Areasleisure" || item.name == "Wayshighway" ) {
          const meshLine = new MeshLine(item.geometry);
          const size = item.scale.x;
          meshLine.mesh.scale.set(size,size,size);
          scene.add(meshLine.mesh);
        }
      }
    });
    scene.add(gltf.scene)
  });
}
