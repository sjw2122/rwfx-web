import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  test:0,
  locale:{
    "lang": {
      "placeholder": "请选择日期",
      "today": "今天",
      "yearFormat": "YYYY",
      "dateFormat": "M/D/YYYY",
      "dayFormat": "D",
      "dateTimeFormat": "M/D/YYYY HH:mm:ss",
      "monthFormat": "MMMM"
    }
  }
}
export default new Vuex.Store({
  state
})
