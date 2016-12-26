import { CartService } from '../../services/cart.service';

export default class ToCartBtnController {

    constructor($rootScope, CartService) {
        "ngInject";
        this.cartService = CartService;
        this.productOrdered = false;
        this.$rootScope = $rootScope;
    }

    $onInit() {

    }

    addDataToCart() {
        this.cartService.addToCart(this.selectedProduct);
        this.$rootScope.$broadcast('addToCartEvent', this.orderedProduct);
    }
}
