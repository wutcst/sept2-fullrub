import "./index.css";
import { createApp } from "vue";
import App from "./views/App.vue";
import router from "./router";
import naive from "naive-ui/es/preset";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();
app.use(router).use(naive).use(pinia);

app.mount("#app");
