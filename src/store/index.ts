import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import IModalContexts from '@/contracts/IModalContext';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async generateCode({commit, state}, modalContexts: IModalContexts) {
      return axios.post('/api/generate', modalContexts);
    },

    async getCodes({commit, state}) {
      return axios.get('/api/codes');
    }
  },
  modules: {},
});
