import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

export default class ProductsController {

    constructor($state, $stateParams, $scope, AuthService, ProductService, CartService) {
        "ngInject";
        this.authService = AuthService;
        this.productService = ProductService;
        this.cartService = CartService;
        this.$state = $state;
        this.$scope = $scope;
        this.imgUrl = this.productService.mainUrl + '/static/';
        this.loggedUser = {
            username: '',
            token: ''
        };
        this.showCartList = false;
    }

    $onInit() {
        this.getProductsData();
        this.getLoggedUserData();
        this.getOrders();

        this.$scope.$on('myTestEvent', (event, data) => {
            let summ = _.sumBy(data, 'count');
            this.productsQuantity = summ;
        });
    }

    getOrders() {
        this.getCartProductsListData();
        let summ = _.sumBy(this.productsList, 'count');
        this.productsQuantity = summ;
    }

    getCartProductsListData() {
        this.productsList = this.cartService.getCartProductsList();
    }

    selectProduct(product) {
        this.selectedProduct = product;
        this.$state.go('detail', {id: product.id});
    }

    unSelectProduct() {
        this.selectedProduct = false;
    }

    getProductsData() {
        this.productService.getProducts().then(products => {
            this.products = products.data;
        });
    }

    getLoggedUserData() {
        this.loggedUser = this.authService.getLoggedUser();
    }

    showModal() {
        this.showCartList = true;
    }

    closeModal() {
        this.showCartList = false;
    }

    logout() {
        setTimeout(() => {
            this.authService.clearUserData();
            this.$state.go('auth');
        }, 500);
    }

}
