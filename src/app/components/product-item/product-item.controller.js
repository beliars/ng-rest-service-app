import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

export default class ProductItemController {

    constructor($state, $stateParams, $scope, $rootScope, AuthService, ProductService, CartService) {
        "ngInject";
        this.authService = AuthService;
        this.productService = ProductService;
        this.cartService = CartService;
        this.$state = $state;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$stateParams = $stateParams;
        this.imgUrl = this.productService.mainUrl + '/static/';
        this.commentData = {
            rate: '',
            text: ''
        };
        this.authError = false;
	    this.validateError = false;
        this.showCartList = false;
        this.orderedProduct = false;
    }

    $onInit() {
        this.getLoggedUserData();
        this.getProductData();
        this.getCommentsData();
        this.getCartProductsListData();


        this.$scope.$on('myTestEvent', (event, data) => {
            let summ = _.sumBy(data, 'count');
            this.productsQuantity = summ;
        });

        this.$scope.$on('addToCartEvent', (event, data) => {
            this.getCartProductsListData();
        });
    }

    getLoggedUserData() {
        this.loggedUser = this.authService.getLoggedUser();
    }

    getProductData() {
        this.productService.getProducts().then(products => {
            let product = products.data.filter(product => product.id == this.$stateParams.id);
            this.selectedProduct = product[0];
        });
    }

    getCommentsData() {
        this.productService.getComments(this.$stateParams.id).then(comments => {
            this.comments = comments.data;
        });
    }

    getCartProductsListData() {
        this.productsList = this.cartService.getCartProductsList();
        let summ = _.sumBy(this.productsList, 'count');
        this.productsQuantity = summ;

        _.each(this.productsList, (item) => {
            if(item.id == this.$stateParams.id) this.orderedProduct = true;
        });

    }

    onSubmit(form) {
        if (!this.loggedUser.token) {
            this.authError = true;
            return;
        }

        if (!this.commentData.rate || !this.commentData.text) {
            this.validateError = true;
            return;
        }

        if (form.$valid) {
            this.productService.postComment(this.selectedProduct.id, this.commentData, this.loggedUser)
            .then(resultData => {
                if (resultData.data.success) {
                    this.comments.push({
                        created_at: Date.now(),
                        text: this.commentData.text,
                        rate: this.commentData.rate,
                        created_by: {username: this.loggedUser.username}
                    })
                }
                this.commentData.rate = '';
                this.commentData.text = '';
                this.validateError = false;
                return this.resultData = resultData;
            })
        }
    }

    goBack() {
        this.$state.go('products');
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
