export class AuthService {
    constructor($http) {
        'ngInject;'
        this.$http = $http;
        this.apiUrl = 'http://smktesting.herokuapp.com/api/';

        this.loggedUser = {
            username: '',
            token: ''
        };
    }

    getLoggedUser() {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
        if (this.loggedUser == null) {
            return this.loggedUser = {
                username: '',
                token: ''
            };
        }
        else return this.loggedUser;
    }

    regUser(regData) {
        regData.username = regData.username.trim();
        return this.$http.post(this.apiUrl + 'register/', regData)
        .then(res => {
            this.loggedUser.username = regData.username;
            this.loggedUser.token = res.data.token;
            localStorage.setItem('loggedUserData', JSON.stringify(this.loggedUser));
            return res;
        })
        .catch(this.handleError);
    }

    loginUser(loginData) {
        loginData.username = loginData.username.trim();
        return this.$http.post(this.apiUrl + 'login/', loginData)
        .then(res => {
            this.loggedUser.username = loginData.username;
            console.log(this.loggedUser.token);
            this.loggedUser.token = res.data.token;
            localStorage.setItem('loggedUserData', JSON.stringify(this.loggedUser));
            return res;
        })
        .catch(this.handleError);
    }


    clearUserData() {
        localStorage.removeItem('loggedUserData');
        localStorage.removeItem('cartProductsListData');
    }

    handleError(error) {
        console.log('An error has occurred!', error);
        return Promise.reject(error.message || error);
    }
}
