import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

export default class CartListController {

    constructor(CartService, ProductService) {
        "ngInject";
        this.cartService = CartService;
        this.productService = ProductService;
        this.imgUrl = this.productService.mainUrl + '/static/';
    }

    $onInit() {
        this.products = this.cartService.getCartProductsList();
        console.log(this.products);
        this.products.forEach(item => {
            console.log(item.id);
        });
    }

}
