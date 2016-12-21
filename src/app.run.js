import { ApiService } from './app/services/api.service';

export default appRunConfig;

function appRunConfig($transitions, $state, ApiService) {
    console.log('Application is running...');
    const apiService = ApiService;

    $transitions.onBefore({}, function($transition, state) {
        console.log('transitions onBefore');
        console.log($transition);

        let loggedUser = apiService.getLoggedUser();
        if (loggedUser.username && loggedUser.token) {
            console.log('Authorized!');
            if ($transition.to().data && $transition.to().data.guest) {
                return $state.target('products');
            }
        }
        else {
            console.log('Not authorized!');
            return true;
        }
    });

    // $rootScope.$on('$stateChangeStart', function(e, to) {
    //     let loggedUser = apiService.getLoggedUser();
    //     console.log('stateChangeStart');
    //     console.log(e);
    //     console.log(to);
    //     e.preventDefault();
    //     $state.go('products');
    // });
}
