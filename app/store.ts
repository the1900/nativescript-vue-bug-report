import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // is bluetooth enabled.
    isBtOn: false,
  },
  mutations: {
    SET_BT_STATE (state, current_state) {
      console.log("commit truggerd", current_state)
      state.isBtOn = current_state
    },
  },
});
