import { AuthService } from './app/services/auth.service';

export default appRunConfig;

function appRunConfig($transitions, $state, AuthService) {
    const authService = AuthService;

    $transitions.onBefore({}, function($transition, state) {
        let loggedUser = authService.getLoggedUser();
        if (loggedUser.username && loggedUser.token) {
            if ($transition.to().data && $transition.to().data.guest) {
                return $state.target('products');
            }
        }
        else {
            return true;
        }
    });
}
