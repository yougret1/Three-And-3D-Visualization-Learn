import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(
  45 , window.innerWidth / window.innerHeight,1,100
)

export default camera