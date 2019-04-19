import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  includePageNames:[],
  tagList:[],
  tagSelected:''
}
export default new Vuex.Store({
  state
})
