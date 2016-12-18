import { ApiService } from '../../services/api.service';

export default class ProductItemController {

    constructor(ApiService, $state, $stateParams) {
        "ngInject";
        this.apiService = ApiService;
        this.$state = $state;
        this.$stateParams = $stateParams;
    }

    $onInit() {
        this.apiService.getProducts().then(products => {
            console.log(products.data[this.$stateParams.id - 1]);
            this.selectedProduct = products.data[this.$stateParams.id - 1];
        });

            this.apiService.getComments(this.$stateParams.id).then(comments => {
            this.comments = comments.data;
        });

    }

    goBack() {
        this.$state.go('products');
    }
}
