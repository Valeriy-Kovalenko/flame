import { createRouter, createWebHistory } from 'vue-router';

import MainPage from './components/MainPage.vue';
import PeopleList from "./components/PeopleList";
import PersonPage from "./components/PersonPage";
import FavoritesList from "./components/FavoritesList";

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
