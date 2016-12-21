import { ApiService } from '../../services/api.service';

export default class UserDetailController {

    constructor(ApiService, $state, $stateParams) {
        "ngInject";
        this.apiService = ApiService;
        this.$state = $state;
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
        this.loggedUser = this.apiService.getLoggedUser();
    }

    logout() {
        setTimeout(() => {
            this.apiService.clearUserData();
            this.$state.go('auth');
        }, 500);
    }

}
