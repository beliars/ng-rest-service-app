export class CartService {
    constructor($http, $rootScope) {
        'ngInject;'
        this.$rootScope = $rootScope;
    }

    addToCart(product) {
        this.getCartProductsList();
        this.productsList.push(product);
        localStorage.setItem('cartProductsListData', JSON.stringify(this.productsList));
        this.$rootScope.$broadcast('myTestEvent', this.productsList);

    }

    getCartProductsList() {
        this.productsList = JSON.parse(localStorage.getItem('cartProductsListData'));
        if (this.productsList == null) {
            return this.productsList = [];
        }
        else return this.productsList;
    }

}
