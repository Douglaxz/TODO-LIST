// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "Cadastro",
        name: "Cadastro",
        component: () =>
          import(/* webpackChunkName: "cadastro" */ "@/views/Cadastro.vue"),
      },
      {
        path: "Dashboard",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
