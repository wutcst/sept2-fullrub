import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/pages/Home.vue";
import Game from "../views/pages/Game.vue";
const router = createRouter({
  routes: [
    {
      name: "home",
      path: "",
      component: Home,
    },
    {
      path: "/game",
      component: Game,
    },
  ],

  history: createWebHashHistory(),
});
export default router;
