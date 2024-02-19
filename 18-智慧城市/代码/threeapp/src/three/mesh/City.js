import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import * as three from 'three'

export default function createCity() {
  const gltfLoader  = new GLTFLoader()
  gltfLoader.load("@/model/zjweu_not_sut_up.glb",(gltf)=>{
    gltf.scene.traverse((item)=>{
      console.log(item)
      // if(item.type == "Mesh")
    })
  })

  }