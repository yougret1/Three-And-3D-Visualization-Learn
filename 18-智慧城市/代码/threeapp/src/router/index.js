import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import TianDiTu from "@/components/TianDiTu";
import Scene from "@/components/Scene";
import Login from "@/views/Login";
import notFind from "@/views/404";
import * as eventEmitter from "@/emitter/eventEmitter";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  { path: "/home", name: "Home", component: Home },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/tianditu",
    name: "tianditu",
    component: TianDiTu,
  },
  {
    path: "/build/:longitude/:latitude",
    name: "build",
    component: Scene,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  eventEmitter.emit("path",to.path)
  next();
});
export default router;
