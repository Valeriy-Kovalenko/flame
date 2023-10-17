import { createRouter, createWebHistory } from 'vue-router';

import MainPage from './pages/MainPage.vue';
import PeopleList from "./pages/PeoplePage.vue";
import PersonPage from "./pages/PersonPage.vue";
import FavoritesList from "./pages/FavoritesPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/people', component: PeopleList },
    { path: '/people/:id', component: PersonPage },
    { path: '/favorites', component: FavoritesList },
  ],
});

export default router;
