// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/auth/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "Cadastro",
        name: "Cadastro",
        component: () =>
          import(/* webpackChunkName: "cadastro" */ "@/views/Cadastro.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "Dashboard",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
      },
      {
        path: "addList",
        name: "addList",
        component: () =>
          import(/* webpackChunkName: "add" */ "@/views/addList.vue"),
      },
      {
        path: "viewList/:id",
        name: "viewList",
        component: () =>
          import(/* webpackChunkName: "Details" */ "@/views/viewList.vue"),
      },
      {
        path: "addListItens/:id",
        name: "addListItens",
        component: () =>
          import(/* webpackChunkName: "Details" */ "@/views/addListItens.vue"),
      },
      {
        path: "viewIListItem/:id",
        name: "viewIListItem",
        component: () =>
          import(/* webpackChunkName: "Details" */ "@/views/viewIListItem.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
