import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

export default class UserDetailController {

    constructor(ApiService, AuthService, $state, $stateParams) {
        "ngInject";
        this.apiService = ApiService;
        this.authService = AuthService;
        this.$state = $state;
        this.imgUrl = this.apiService.mainUrl + '/static/';
        this.loggedUser = {
            username: '',
            token: ''
        }
    }

    $onInit() {
        this.getProductsData();
        this.getLoggedUserData();
    }

    selectProduct(product) {
        this.selectedProduct = product;
        this.$state.go('detail', {id: product.id});
    }

    unSelectProduct() {
        this.selectedProduct = false;
    }

    getProductsData() {
        this.apiService.getProducts().then(products => {
            this.products = products.data;
        });
    }

    getLoggedUserData() {
        this.loggedUser = this.authService.getLoggedUser();
    }

    logout() {
        setTimeout(() => {
            this.apiService.clearUserData();
            this.$state.go('auth');
        }, 500);
    }

}
