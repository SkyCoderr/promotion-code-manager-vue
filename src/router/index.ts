import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Scan from "../views/Scan.vue";
import Generate from "../views/Generate.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/scan",
  },
  {
    path: "/scan",
    name: "Scan",
    component: Scan,
  },
  {
    path: "/generate",
    name: "Generate",
    component: Generate,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;