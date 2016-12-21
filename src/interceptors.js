import { ApiService } from './app/services/api.service';

export function myInterceptor($injector) {
    console.log($injector);
    return {
        request: function(config) {
            console.log('myInterceptor config');
            console.log(config);
            console.log(config.method == 'POST');
            if(config.url.indexOf('http://smktesting.herokuapp.com/api/') > -1) {
                const apiService = $injector.get('ApiService');
                let loggedUser = apiService.getLoggedUser();

                config.headers['Content-Type'] = 'application/json';
                config.headers['Accept'] = 'application/json';
                config.headers['x-csrftoken'] = 'blabla-test-token';
                // config.headers['Authorization'] = 'Token ' + loggedUser.token; -> проблема с запросами, если токен undefined

            }
            return config;
        },

        requestError: function(config) {
            return config;
        },

        response: function(res) {
            return res;
        },

        responseError: function(res) {
            return res;
        }
    }
}
