export class CartService {
    constructor($http, $rootScope) {
        'ngInject;'
        this.$rootScope = $rootScope;

    }

    addToCart(product) {
        this.getCartProductsList();

        let index = null;
        for(let i = 0; i<this.productsList.length; i++) {
            if(product.id == this.productsList[i].id){
                 index = i;
                 break;
            }
        }
        if(index != null) {
            this.productsList[index].count++;
        }
        else {
            product.count = 1;
            this.productsList.push(product);
        }

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

    cleanOutCart() {
        localStorage.removeItem('cartProductsListData');
        this.productsList = [];
        this.$rootScope.$broadcast('myTestEvent', this.productsList);
    }
}
