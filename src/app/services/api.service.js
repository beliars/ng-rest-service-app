export class ApiService {
    constructor($http) {
        'ngInject;'
        this.$http = $http;
        this.mainUrl = 'http://smktesting.herokuapp.com/';
        this.apiUrl = 'http://smktesting.herokuapp.com/api/';

        this.loggedUser = {
            username: '',
            token: ''
        };
    }

    getProducts() {
        return this.$http.get(this.apiUrl + 'products/')
        .then(res => res)
        .catch(this.handleError);
    }

    getProduct(id) {
        console.log(id);
        return this.$http.get(this.apiUrl + 'products/' + id)
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
    
    postComment(id, commentData, user) {
        commentData.text = commentData.text.trim();
        let data = JSON.stringify(commentData);
        return this.$http.post(this.apiUrl + 'reviews/' + id, data)
            .then(res => res)
            .catch(this.handleError);
    }

    clearUserData() {
        localStorage.removeItem('loggedUserData');
    }
}
