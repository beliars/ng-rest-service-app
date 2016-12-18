export class ApiService {
  constructor($http) {
    'ngInject;'
    this.$http = $http;
    this.apiUrl = 'http://smktesting.herokuapp.com/api/';
    this.headers = new Headers({'Content-Type': 'application/json',
                          'Accept': 'application/json'});
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

}
