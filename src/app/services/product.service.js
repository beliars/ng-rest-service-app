export class ProductService {
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
        .then(res => {
            console.log(res.data);
            _.each(res.data, (item, i) => {
                res.data[i].price = item.id*123;
            });
            console.log(res.data);
            return res;
        })
        .catch(this.handleError);
    }

    getComments(id) {
        return this.$http.get(this.apiUrl + 'reviews/' + id)
        .then(res => res)
        .catch(this.handleError);
    }

    postComment(id, commentData, user) {
        commentData.text = commentData.text.trim();
        return this.$http.post(this.apiUrl + 'reviews/' + id, commentData)
            .then(res => res)
            .catch(this.handleError);
    }

    handleError(error) {
        console.log('An error has occurred!', error);
        return Promise.reject(error.message || error);
    }
}
