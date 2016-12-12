import { ApiService } from '../../services/api.service';

export default class AuthController {  
   
    constructor(ApiService, $state) {    
        "ngInject";
        this.$state = $state;
        this.heading = 'AuthController';
        this.apiService = ApiService;
    }

    $onInit() {
    }

    skipAuth() {
        this.$state.go('products');
    }
}