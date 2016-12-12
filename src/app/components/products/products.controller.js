import { ApiService } from '../../services/api.service';

export default class UserDetailController {  
   
    constructor(ApiService, $state) {    
        "ngInject";
        this.apiService = ApiService;
        this.$state = $state;
        this.productsTitle = 'Products Component Title';
    }

    $onInit() {
        this.apiService.getProducts().then(products => {
            console.log(products.data);
            this.products = products.data;
        });
    }

    goBack() {
        this.$state.go('auth');
    }

    selectProduct(product) {
        this.selectedProduct = product;
        console.log(product.id);
        this.getComments(product.id);
    }

    getComments(id) {
        this.apiService.getComments(id).then(comments => {
            console.log(comments);
            this.comments = comments;
            });
    }

    

}
