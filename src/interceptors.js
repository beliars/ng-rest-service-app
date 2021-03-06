import { AuthService } from './app/services/auth.service';

export function myInterceptor($injector) {
    return {
        request: function(config) {
            if(config.url.indexOf('http://smktesting.herokuapp.com/api/') > -1) {
                const authService = $injector.get('AuthService');
                let loggedUser = authService.getLoggedUser();

                config.headers['Content-Type'] = 'application/json';
                config.headers['Accept'] = 'application/json';
                config.headers['x-csrftoken'] = 'blabla-test-token';
                if(loggedUser.token){
                    config.headers['Authorization'] = 'Token ' + loggedUser.token;
                }

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
