import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },
  {
    path: '/',
    name: 'home',
    redirect: { name: 'movies' },
    component: () => import('layouts/MovieLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: '',
        name: 'movies',
        component: () => import('pages/MoviesPage.vue'),
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('pages/AddMoviePage.vue'),
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('pages/EditMoviePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
