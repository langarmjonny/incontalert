import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Orte',
    icon: 'nb-close-circled',
    children: [
      {
        title: 'Liste',
        link: '/pages/machines/machines-table',
      },
      {
        title: 'Letzte Ziele',
        link: '/pages/machines/machines-soll-hist',
      },
    ],
  },
  {
    title: 'Bereich',
    icon: 'nb-keypad',
    link: '/pages/area',
  },
  {
    title: 'Statistiken',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Robotino',
        link: '/pages/charts/robotino',
      },
      {
        title: 'User',
        link: '/pages/charts/user',
      },
      {
        title: 'Inventur',
        link: '/pages/charts/inventur',
      },
    ],
  },
  {
    title: 'User',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  
];
