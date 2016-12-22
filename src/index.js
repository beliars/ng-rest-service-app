import angular from 'angular';

import { ApiService } from './app/services/api.service';
import { AppComponent } from './app/components/app.component';
import { AuthComponent } from './app/components/auth/auth.component';
import { ProductsComponent } from './app/components/products/products.component';
import { ProductItemComponent } from './app/components/product-item/product-item.component';
import { ToCartBtnComponent } from './app/components/to-cart-btn/to-cart-btn.component';


import 'angular-ui-router';
import routesConfig from './routes';
import appRunConfig from './app.run';
import { myInterceptor } from './interceptors';

import './index.scss';

angular
  .module('products-app', ['ui.router'])
  .service('ApiService', ApiService)
  .component('restApp', AppComponent)
  .component('auth', AuthComponent)
  .component('products', ProductsComponent)
  .component('productItem', ProductItemComponent)
  .component('toCartBtn', ToCartBtnComponent)
  .factory('myInterceptor', myInterceptor)
  .config(routesConfig)
  .config(function($httpProvider) {
      $httpProvider.interceptors.push('myInterceptor');
  })
  .run(appRunConfig);
  // .directive('chartModalDirective', ($compile) => new ChartModalDirective($compile))
