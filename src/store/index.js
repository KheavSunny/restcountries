import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    countries: [],
  },
  getters: {},
  actions: {
    getCountries({ commit }) {
      return axios.get('https://restcountries.com/v3.1/all').then((res) => {
        commit('setCountries', res.data);
        return res.data;
      });
    },
  },
  mutations: {
    setCountries(state,data){
        state.countries = data;
    }
  },
  modules: {},
});

export default store;
