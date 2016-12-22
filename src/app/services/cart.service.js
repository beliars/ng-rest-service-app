export class CartService {
    constructor($http) {
        'ngInject;'
    }

    addToCart(product) {
        this.getCartProductsList();
        this.productsList.push(product);
        localStorage.setItem('cartProductsListData', JSON.stringify(this.productsList));

    }

    getCartProductsList() {
        this.productsList = JSON.parse(localStorage.getItem('cartProductsListData'));
        if (this.productsList == null) {
            return this.productsList = [];
        }
        else return this.productsList;
    }

}
