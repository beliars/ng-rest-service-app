import ToCartBtnController from './to-cart-btn.controller';
import './to-cart-btn.component.scss';

export const ToCartBtnComponent = {
    template: require('./to-cart-btn.component.html'),
    controller: ToCartBtnController,
    bindings: {
        selectedProduct: '<',
        orderedProduct: '<'
    }
};
