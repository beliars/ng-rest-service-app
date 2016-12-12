import ProductsController from './products.controller';
import './products.component.scss';

export const ProductsComponent = {
  template: require('./products.component.html'),    
  controller: ProductsController,
  bindings: {
    chosenUser: '<'
  }
};
