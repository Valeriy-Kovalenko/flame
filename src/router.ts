import { createRouter, createWebHistory, RouterOptions } from "vue-router";

const MainPage = () => import("./pages/MainPage.vue");
const PeoplePage = () => import("./pages/PeoplePage.vue");
const PersonPage = () => import("./pages/PersonPage.vue");
const FavoritesPage = () => import("./pages/FavoritesPage.vue");

const router = createRouter(<RouterOptions>{
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/people", component: PeoplePage },
    { path: "/people/:id", component: PersonPage },
    {
      path: "/favorites",
      component: FavoritesPage,
    },
  ],
});

export default router;
