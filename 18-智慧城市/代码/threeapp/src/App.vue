<template>
  <div id="nav">
    <router-link to="/" v-bind:class="{ 'active': activeLink === 'home' }" @click="setActiveLink('home')">Home</router-link> |
    <router-link to="/about" v-bind:class="{ 'active': activeLink === 'about' }" @click="setActiveLink('about')">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="less">
html,body{
  padding: 0;
  margin: 0;
  border: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav{
  position: fixed;
  display: flex;
  top: 0;
  justify-content: center;
  width: 100%;
  color: white;
}

.active {
  color: white; // 点击后字体变为白色
}

.clicked {
  color: gray; // 已经点击过的字体变为红色
}
</style>

<script>
export default {
  data() {
    return {
      activeLink: '' // 用于存储当前活动的链接
    };
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link;
    }
  }
};
</script>
