var app = angular.module('mailBox', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('mail', {
            url: '/mail',
            template: '<mail></mail>'
        })

    $urlRouterProvider.otherwise('mail');
});

app.run(function ($rootScope, $state, AuthService){
    $rootScope.$on('$stateChangeStart', function(event, toState){
        if (toState.name !== 'login' && !AuthService.isAuthorized()){
            event.preventDefault();
            $state.go('login');
        }
    });
});

app.directive('login', function ($state, AuthService) {
    return {
        templateUrl: 'login.html',
        controller: function($state, AuthService){
            this.doLogin = function(login, password){
                return AuthService.authorize(login, password);
            };

            this.goMail = function(){
                $state.go('mail');
            };
        },
        controllerAs: "loginCtrl"
    }
});

app.service('AuthService', function () {
    var isLogin = false;

    this.authorize = function(login, password){
        if (login === 'admin' && password === 'admin') {
            isLogin = true;
        } else {
            isLogin = false;
        }
        return isLogin;
    }

    this.isAuthorized = function(){return isLogin};
});

app.directive('mail', function () {
    return {
        template: '<h1>mailBox</h1>'
    };
});