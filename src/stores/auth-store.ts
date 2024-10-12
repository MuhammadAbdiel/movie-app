import { defineStore } from 'pinia';

interface UserType {
  token: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserType | null,
  }),
  persist: true,
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setAuth(user: UserType) {
      this.user = user;
    },
    clearAuth() {
      this.user = null;
      localStorage.removeItem('auth');
    },
  },
});
