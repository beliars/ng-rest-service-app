import { CartService } from '../../services/cart.service';

export default class ToCartBtnController {

    constructor(CartService) {
        "ngInject";
        this.cartService = CartService;
        console.log(this.selectedProduct);
    }

    $onInit() {
    }

    addDataToCart() {
        console.log(this.selectedProduct);
        this.cartService.addToCart(this.selectedProduct);

    }
}
