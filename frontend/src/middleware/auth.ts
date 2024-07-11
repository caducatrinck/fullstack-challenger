// src/middleware/auth.ts
// src/middleware/auth.ts
import { useToken } from '@/stores/auth';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const store = useToken(); // Acesse a store do Pinia
  if (to.name !== 'login' && to.name !== 'registrar' && !store.token) {
    // O usuário não está logado e está tentando acessar uma rota protegida
    next({ name: 'login' }); // Redirecione para a página de login
  } else if ((to.name === 'login' || to.name === 'registrar') && store.token) {
    // O usuário está logado e está tentando acessar a página de login ou registro
    next({ name: 'dashboard' }); // Redirecione para a página inicial
  } else {
    // O usuário está autorizado a acessar a rota ou está na página de login/registro
    next(); // Continue para a próxima rota
  }
};

export default authGuard;
