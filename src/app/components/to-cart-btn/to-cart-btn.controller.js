import { CartService } from '../../services/cart.service';

export default class ToCartBtnController {

    constructor(CartService) {
        "ngInject";
        this.cartService = CartService;
    }

    addDataToCart() {
        console.log('Adding product to cart...');
        console.log(this.selectedProduct);
        this.cartService.addToCart(this.selectedProduct);
    }
}
