import Vue from "vue";
import Router from "vue-router";
import axios from "axios";

import CanvasView from "../views/CanvasView";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "canvas",
      component: CanvasView
    }
  ]
});
