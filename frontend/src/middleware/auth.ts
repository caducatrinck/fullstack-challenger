import { useToken } from '@/stores/auth';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const store = useToken();

  if (to.name !== 'login' && to.name !== 'registrar' && !store.token) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'registrar') && store.token) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
};

export default authGuard;
