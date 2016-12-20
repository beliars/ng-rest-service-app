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
        this.getProducts();
        this.getLoggedUserData();
    }

    selectProduct(product) {
        this.selectedProduct = product;
        this.$state.go('detail', {id: product.id, user: this.loggedUser});
    }

    unSelectProduct() {
        this.selectedProduct = false;
    }

    getProducts() {
        this.apiService.getProducts().then(products => {
            this.products = products.data;
        });
    }

    getLoggedUserData() {
        this.loggedUser = this.apiService.getLoggedUser();
    }

    goBack() {
        this.$state.go('auth');
    }

    logout() {
        setTimeout(() => {
            this.loggedUser.username = '';
            this.loggedUser.token = '';
            this.$state.go('auth');
        }, 1000);
    }

}
