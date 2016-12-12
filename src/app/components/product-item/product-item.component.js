import ProductItemController from './product-item.controller';
import './product-item.component.scss';

export const ProductItemComponent = {
    template: require('./product-item.component.html'),    
    controller: ProductItemController,
    bindings: {
        selectedProduct: '<',
        comments: '<',
        loggedUser: '<'
    }
};
