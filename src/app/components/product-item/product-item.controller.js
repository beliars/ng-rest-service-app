import { ApiService } from '../../services/api.service';

export default class ProductItemController {

    constructor(ApiService, $state, $stateParams) {
        "ngInject";
        this.apiService = ApiService;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.commentData = {
            rate: '',
            text: ''
        };
        this.authError = false;
	    this.validateError = false;
    }

    $onInit() {
        this.loggedUser = this.$stateParams.user;

        this.apiService.getProducts().then(products => {
            this.selectedProduct = products.data[this.$stateParams.id - 1];
        });

        this.apiService.getComments(this.$stateParams.id).then(comments => {
            this.comments = comments.data;
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

            this.apiService.postComment(this.selectedProduct.id, this.commentData, this.loggedUser)
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

    logout() {
        setTimeout(() => {
            this.loggedUser.username = '';
            this.loggedUser.token = '';
            this.$state.go('auth');
        }, 500);
    }

}
