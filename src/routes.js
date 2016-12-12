export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('auth', {
      url: '/',
      component: 'auth'
    })
    .state('products', {
      url: '/products',
      component: 'products'
    });
}

