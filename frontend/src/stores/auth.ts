import { defineStore } from 'pinia';
import router from '@/router';

export const useToken = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  getters: {
    tokenValue: (state) => state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token');
      router.push({ name: 'login' });
    }
  }
});
