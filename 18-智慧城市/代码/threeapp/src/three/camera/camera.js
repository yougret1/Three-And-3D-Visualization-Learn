import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(
  75 , window.innerWidth / window.innerHeight,1,5000
)
camera.position.set(0,15,15)

export default camera