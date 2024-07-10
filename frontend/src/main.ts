import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import ToastPlugin from 'vue-toast-notification';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');

app.use(ToastPlugin);
