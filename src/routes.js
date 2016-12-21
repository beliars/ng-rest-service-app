export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('auth', {
      url: '/',
      component: 'auth',
      data: {
          guest: true
      }
    })
    .state('products', {
      url: '/products',
      component: 'products'
    })
    .state('detail', {
      url: '/detail/:id',
      component: 'productItem'
    });
}
