import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/Auth'
import Projects from './modules/Projects'
import Investors from './modules/Investors'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,    
    Projects,
    Investors
  }
})