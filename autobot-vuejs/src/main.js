// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import Vue from 'vue';
import App from './App.vue';
import socket from './socket';

Vue.config.productionTip = false;

Vue.prototype.$socket = socket;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

