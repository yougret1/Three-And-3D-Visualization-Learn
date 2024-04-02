import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(
  50 , window.innerWidth / window.innerHeight,1,50
)
camera.position.set(0,0,1)

export default camera