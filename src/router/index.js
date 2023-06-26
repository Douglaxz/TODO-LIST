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
      {
        path: "Addition",
        name: "Addition",
        component: () =>
          import(/* webpackChunkName: "add" */ "@/views/Addition.vue"),
      },
      {
        path: "Details/:id",
        name: "Details",
        component: () =>
          import(/* webpackChunkName: "Details" */ "@/views/Details.vue"),
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
