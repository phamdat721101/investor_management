import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import DatetimePicker from 'vuetify-datetime-picker'
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";

stockInit(Highcharts);

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(HighchartsVue);
Vue.use(DatetimePicker)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
