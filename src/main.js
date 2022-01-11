import Vue from 'vue';
import App from './App.vue';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Bus from './utils/Bus';
import axios from 'axios';
import VueAxios from './utils/vue-axios';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Bus);
Vue.use(VueAxios, axios)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
