import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import authGuard from '@/middleware/auth';
import DashboardView from '@/views/DashboardView.vue';
import AddCategory from '@/components/AddCategory.vue';
import AddProduct from '@/components/AddProduct.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'registrar',
    component: RegisterView
  },
  {
    path: '/add-category',
    name: 'add-category',
    component: AddCategory
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProduct
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  authGuard(to, from, next);
});

export default router;
