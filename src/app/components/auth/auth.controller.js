import { ApiService } from '../../services/api.service';

export default class AuthController {

    constructor(ApiService, $state) {
        "ngInject";
        this.$state = $state;
        this.heading = 'AuthController';
        this.apiService = ApiService;

        this.regData = {
            username: '',
            password: ''
        }

        this.loginData = {
            username: '',
            password: ''
        }
    }


    onSubmitReg(form) {
        if (form.$valid) {
            this.apiService.regUser(this.regData).then(resultData => {
                resultData = resultData.data;
                if (resultData.success) {
					this.regFailMessage = '';
                    this.loginFailMessage = '';
					this.regSuccessMessage = 'Registration successfull. Logging in...';
					setTimeout(() => {
						this.$state.go('products');
					}, 1000);
				}
				else {
					this.regSuccessMessage = '';
                    this.loginFailMessage = '';
					this.regFailMessage = resultData.message + '.';
                    form.username.$$element[0].focus();
				}
				return this.regData = resultData;
            });
        }
    }

    onSubmitLogin(form) {
        if (form.$valid) {
            this.apiService.loginUser(this.loginData).then(resultData => {
                resultData = resultData.data;
                if (resultData.success) {
					this.loginFailMessage = '';
                    this.regFailMessage = '';
					this.loginSuccessMessage = 'Logging in...';
					setTimeout(() => {
						this.$state.go('products');
					}, 1000);
				}
				else {
					this.loginSuccessMessage = '';
                    this.regFailMessage = '';
					this.loginFailMessage = resultData.message + '.';
                    form.username.$$element[0].focus();
				}
				return this.loginData = resultData;
            });
        }
    }

    skipAuth() {
        this.apiService.clearUserData();
        this.$state.go('products');
    }
}
