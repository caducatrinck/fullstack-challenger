// store/index.ts

import { createStore, type Commit } from 'vuex';

const store = createStore<{
  darkMode: boolean;
}>({
  state: {
    darkMode: false // Inicialmente o modo escuro está desativado
  },
  mutations: {
    toggleDarkMode(state: { darkMode: boolean }) {
      state.darkMode = !state.darkMode;
    }
  },
  actions: {
    toggleDarkMode({ commit }: { commit: Commit }) {
      commit('toggleDarkMode');
    }
  },
  getters: {
    isDarkMode(state: { darkMode: boolean }) {
      return state.darkMode;
    }
  }
});

export default store;
