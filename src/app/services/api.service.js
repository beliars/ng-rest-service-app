export class ApiService {
    constructor($http) {
        'ngInject;'
        this.$http = $http;
        this.apiUrl = 'http://smktesting.herokuapp.com/api/';
        this.config = {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        this.loggedUser = {
            username: '',
            token: ''
        };
    }

    getLoggedUser() {
        return this.loggedUser;
    }

    getProducts() {
        return this.$http.get(this.apiUrl + 'products/')
        .then(res => res)
        .catch(this.handleError);
    }

    getComments(id) {
        return this.$http.get(this.apiUrl + 'reviews/' + id)
        .then(res => res)
        .catch(this.handleError);
    }


    handleError(error) {
        console.log('An error has occurred!', error);
        return Promise.reject(error.message || error);
    }

    regUser(regData) {
        regData.username = regData.username.trim();
        this.loggedUser.username = regData.username;
        let data = JSON.stringify(regData);
        return this.$http.post(this.apiUrl + 'register/', data, this.config)
        .then(res => {
            this.loggedUser.token = res.data.token;
            return res;
        })
        .catch(this.handleError);
    }

    loginUser(loginData) {
        loginData.username = loginData.username.trim();
        this.loggedUser.username = loginData.username;
        let data = JSON.stringify(loginData);
        return this.$http.post(this.apiUrl + 'login/', data, this.config)
        .then(res => {
            this.loggedUser.token = res.data.token;
            return res;
        })
        .catch(this.handleError);
    }

    postComment(id, commentData, user) {
        commentData.text = commentData.text.trim();
        let data = JSON.stringify(commentData);
        this.config.headers.Authorization = 'Token ' + user.token;
        return this.$http.post(this.apiUrl + 'reviews/' + id, data, this.config)
            .then(res => res)
            .catch(this.handleError);
    }

    clearUserData() {
        this.loggedUser.username = '';
        this.loggedUser.token = '';
    }
}
