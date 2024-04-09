<template>
  <div id="nav" v-bind:class="{ 'notShow': isLogin == false || nowPath != '/home'  }">
    <button>
      <router-link to="/" v-bind:class="{ 'active': activeLink === 'home' }"
        @click="setActiveLink('tianditu')">查看地图</router-link>
    </button>
    &nbsp;| &nbsp;
    <button>
      <router-link to="/about" v-bind:class="{ 'active': activeLink === 'about' }"
        @click="setActiveLink('')">重新登录</router-link>
    </button>
    &nbsp;| &nbsp;
    <button @click="openHumanView()">人物视角</button>
  </div>
  <router-view />
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import * as eventEmitter from './emitter/eventEmitter'

export default {
  setup() {
    const activeLink = ref(''); // 用于存储当前活动的链接
    const humanView = ref(false);
    const isLogin = ref(false);
    const nowPath = ref('');
    const route = useRoute();
    const href = window.location.href.split('/');

    console.log(href[href.length - 1]);
    
    eventEmitter.on("is-login", (event) => {
      isLogin.value = event;
    });

    eventEmitter.on("path", (event) => {
      nowPath.value = event;
      console.log([nowPath.value, isLogin.value]);
    });

    const setActiveLink = (link) => {
      activeLink.value = link;
    };

    const openHumanView = () => {
      humanView.value = !humanView.value;
      eventEmitter.emit('human-view', humanView.value);
    };

    return {
      activeLink,
      humanView,
      isLogin,
      nowPath,
      setActiveLink,
      openHumanView
    };
  },

};
</script>



<style lang="less">
html,
body,
#app {
  padding: 0;
  margin: 0;
  border: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: fixed;
  display: flex;
  top: 0;
  justify-content: center;
  width: 100%;
  color: white;
  background-color: transparent;
}

.active {
  color: white; // 点击后字体变为白色
}

.clicked {
  color: gray; // 已经点击过的字体变为红色
}

.notShow {
  display: none !important;
}
</style>
./utils/emitter/eventEmitter