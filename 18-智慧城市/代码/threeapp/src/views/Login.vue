<template>
  <div class="container">
    <div class="login-form">
      <!-- 左边logo -->
      <div class="left">
        <div class="pic">
          <img src="../../public/picture/test2.jpeg" alt="" />
        </div>
      </div>
      <!-- 右边表单部分 -->
      <div class="right">
        <div class="title_container">
          <!-- Problem solving management system -->
          <h2 style="display: inline-block">巴拉巴拉系统</h2>
        </div>
        <el-form :model="formInline" class="formModel">
          <el-input v-model="formInline.username" placeholder="账号" size="large">
          </el-input>
          <el-input v-model="formInline.password" type="password" placeholder="密码" size="large"
            style="margin-top: 10px;">
          </el-input>
          <el-button @click="checkLogin" type="primary" class="btnLarge">
            登录
          </el-button>
          <!-- <el-button @click="register" type="primary" class="btnLarge">
            注册
          </el-button> -->
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref, onMounted, reactive } from 'vue';
import * as eventEmitter from "../emitter/eventEmitter";
import { throttle } from '@/utils/throttle/throttle';
import { useRouter } from "vue-router";

const router = useRouter();

const formInline = ref({
  username: "",
  password: "",
});
const updated = () => {
  window.addEventListener("keydown", this.KeyDown, { once: true });
}

/**
 *@Description: 请求登录，发送表单
 *@Date: 2023-07-10 10:06:39
*/
const checkLogin = async () => {
  console.log(formInline.value)
  // console.log("now is check login")
  if (formInline.value.username == "" || formInline.value.password == "") {
    // this.$message.warning("必要信息未填写");
    return;
  }
  if (formInline.value.password === "123456" && formInline.value.username === "admin") {
    console.log(123)
    eventEmitter.emit('is-login',true);
    router.push('/tianditu')
  }
  // const res = await this.$http.post("/login", this.formInline);
  // if (res != "") {
  //   this.$storage.setItem("token", res.token || "");
  //   this.$storage.setItem("role", res.role || "");
  //   this.$storage.setItem("username", this.formInline.username || "");
  // }
  // if (res.role == "ROLE_STUDENT") {
  //   emitter.emit('isLogin', { message: true });
  //   this.$router.push("/practice");
  // } else {
  //   this.$router.push("/teacher");
  // }
  formInline.value.password = "";
  formInline.value.username = "";
};
/**
 *@Description: 注册
 *@Date: 2023-07-10 10:23:11
*/
// async register() {
//   if (this.formInline.username == "" || this.formInline.password == "") {
//     this.$message.warning("必要信息未填写");
//     return;
//   }
//   await this.$http.post("/register", this.formInline);
//   this.formInline.username = "";
//   return;
// },
/**
 *@Description: 对事件的监听进行响应，开始检查登录
 *@Date: 2023-07-10 10:17:44
*/
const KeyDown = (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    this.throttledCheckLogin();
  }
};
/**
 *@Description: 节流登录
*@Date: 2023-07-10 14:24:08
*/
const throttledCheckLogin = () => {
  throttle(this.checkLogin(), 2000);
}

</script>
<style scoped lang="less">
.btnLarge {
  margin-top: 10px;
  width: 100px;
  height: 39px;
}

.inputWidth {
  width: 300px;
}

.formModel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica, "PingFang SC", "Microsoft Yahei", sans-serif;
  font-size: 14px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../public/picture/bg-test2.png");
  width: 100vw;
  height: 100vh;
  background-size: cover;
}

//右边 表单部分
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 880px;
  height: 400px;
  border-radius: 30px;

  .left {
    flex: 1;
    width: 320px;
    height: 320px;

    .pic img {
      margin-left: 30px;
      object-fit: cover;
      width: 400px;
      height: 300px;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .title_container {
      width: 100%;
      margin-bottom: 20px;
      text-align: center;

      h2 {
        font-size: 28px;
        color: #2691ff;
        font-weight: 550;
      }
    }

    .el-input {
      /* margin-top: 30px; */
    }

    .el-input__inner {
      background: pink;
    }

    .el-button {
      width: 383px;
      height: 40px;
      margin-top: 20px;
      background-color: #409eff;
      color: white;
    }
  }
}
</style>
