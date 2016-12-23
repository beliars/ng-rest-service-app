import CartListController from './cart-list.controller';
import './cart-list.component.scss';

export const CartListComponent = {
    template: require('./cart-list.component.html'),
    controller: CartListController,
    bindings: {
        onClose: '&'
    }
};
