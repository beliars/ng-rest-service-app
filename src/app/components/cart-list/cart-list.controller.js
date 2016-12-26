import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

export default class CartListController {

    constructor($rootScope, CartService, ProductService) {
        "ngInject";
        this.cartService = CartService;
        this.productService = ProductService;
        this.$rootScope = $rootScope;
        this.imgUrl = this.productService.mainUrl + '/static/';
        this.notice = false;
    }

    $onInit() {
        this.getCartProductsListData();
        if (this.products.length == 0) this.notice = true;

        this.getTotalPrice();
    }

    plusProduct(id) {
        _.map(this.products, (item, i) => {
            if(item.id == id) {
                this.products[i].count++;
            };
        });
        this.getTotalPrice();
        this.$rootScope.$broadcast('myTestEvent', this.products);
    }

    minusProduct(id) {
        _.map(this.products, (item, i) => {
            if(item.id == id && this.products[i].count > 0) this.products[i].count--;
        });
        this.getTotalPrice();
        this.$rootScope.$broadcast('myTestEvent', this.products);
    }

    onChange(product) {
        _.map(this.products, (item, i) => {
            if(item.id == product.id && this.products[i].count > 0) this.products[i].count = +product.count;
        });
        this.getTotalPrice();
        this.$rootScope.$broadcast('myTestEvent', this.products);
    }

    checkout() {
        // this.cartService.cleanOutCart();
        // alert('Your order was successful!');
        // this.onClose();
    }


    getCartProductsListData() {
        this.products = this.cartService.getCartProductsList();
    }

    getTotalPrice() {
        this.totalPrice = 0;
        _.each(this.products, (item, i) => {
            this.totalPrice = this.totalPrice + (item.price * item.count);
        });
    }

}
