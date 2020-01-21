module.exports = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      
      {
        path: '/',
        component: '../pages/index',
      },
      {
        path: '/goodsManger',
        component: '../pages/Half-goods/index',
      },
      {
        path: '/login',
        component: '../pages/Login/index.tsx',
      },
      
    ],
  },
  
];
