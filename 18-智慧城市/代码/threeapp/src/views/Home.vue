<template>
  <div class="home">
    <Scene></Scene>
  </div>
</template>

<script>
// @ is an alias to /src
import testVertex from '@/shader/test/Vertex.glsl'
import Scene from '@/components/Scene.vue'

console.log(testVertex)
export default {
  name: 'Home',
  components: {
    Scene,
  }
}
</script>
