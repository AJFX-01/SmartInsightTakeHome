// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import socket from './socket';

const app = createApp(App);

app.config.globalProperties.$socket = socket;

app.mount('#app');

