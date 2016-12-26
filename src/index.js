import angular from 'angular';

import { AuthService } from './app/services/auth.service';
import { ProductService } from './app/services/product.service';
import { CartService } from './app/services/cart.service';
import { AppComponent } from './app/components/app.component';
import { AuthComponent } from './app/components/auth/auth.component';
import { ProductsComponent } from './app/components/products/products.component';
import { ProductItemComponent } from './app/components/product-item/product-item.component';
import { ToCartBtnComponent } from './app/components/to-cart-btn/to-cart-btn.component';
import { CartListComponent } from './app/components/cart-list/cart-list.component';
import { myInterceptor } from './interceptors';

import _ from 'lodash';

import 'angular-ui-router';
import routesConfig from './routes';
import appRunConfig from './app.run';

import './index.scss';

angular
  .module('products-app', ['ui.router'])
  .service('AuthService', AuthService)
  .service('ProductService', ProductService)
  .service('CartService', CartService)
  .component('restApp', AppComponent)
  .component('auth', AuthComponent)
  .component('products', ProductsComponent)
  .component('productItem', ProductItemComponent)
  .component('toCartBtn', ToCartBtnComponent)
  .component('cartList', CartListComponent)
  .factory('myInterceptor', myInterceptor)
  .config(routesConfig)
  .config(function($httpProvider) {
      $httpProvider.interceptors.push('myInterceptor');
  })
  .run(appRunConfig);
  // .directive('chartModalDirective', ($compile) => new ChartModalDirective($compile))
