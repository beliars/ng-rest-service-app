import { CartService } from '../../services/cart.service';

export default class ToCartBtnController {

    constructor(CartService, $scope) {
        "ngInject";
        this.cartService = CartService;
        this.$scope = $scope;
    }

    addDataToCart() {
        this.cartService.addToCart(this.selectedProduct);
    }
}
