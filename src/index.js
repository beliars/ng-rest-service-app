import angular from 'angular';

import { ApiService } from './app/services/api.service';
import { AppComponent } from './app/components/app.component';
import { AuthComponent } from './app/components/auth/auth.component';
import { ProductsComponent } from './app/components/products/products.component';
import { ProductItemComponent } from './app/components/product-item/product-item.component';

import 'angular-ui-router';
import routesConfig from './routes';
import appRunConfig from './app.run';
import { myInterceptor } from './interceptors';

import './index.scss';

angular
  .module('products-app', ['ui.router'])
  .config(routesConfig)
  .run(appRunConfig)
  .component('restApp', AppComponent)
  .component('auth', AuthComponent)
  .component('products', ProductsComponent)
  .component('productItem', ProductItemComponent)
  .factory('myInterceptor', myInterceptor)
  .config(function($httpProvider) {
      $httpProvider.interceptors.push('myInterceptor');
  })
  .service('ApiService', ApiService);
  // .directive('chartModalDirective', ($compile) => new ChartModalDirective($compile))
