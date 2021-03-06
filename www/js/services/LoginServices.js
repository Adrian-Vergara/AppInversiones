(function(){
	'use strict';

	angular.module('starter')
		.factory('LoginService', LoginService);

        function LoginService($http, $q){
            var authServiceFactory = {};

            var _authentication = {
                isAuth: false
            };

            var _login = function (loginData) {
                var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;

                var deferred = $q.defer();

                $http.post(Inversion._getUrl() + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorage.setItem('token', response.access_token);

                    _authentication.isAuth = true;

                    deferred.resolve(response);

                }).error(function (err, status) {
                    deferred.reject(err);
                });

                return deferred.promise;

            };

            authServiceFactory.login = _login;

            return authServiceFactory;
        }
})();