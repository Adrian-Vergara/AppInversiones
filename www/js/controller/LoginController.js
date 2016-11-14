/**
 * Created by Ing. Adrian Vergara on 2/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('LoginController', LoginController);

    function LoginController($ionicPopup, $scope, $state, LoginService) {
        $scope.credenciales = {};
        $scope.loading = false;

        $scope.login = function () {
            var titulo = "Error";
            var contenido;
            if ($scope.credenciales.username == "" || $scope.credenciales.username == null || $scope.credenciales.password == "" || $scope.credenciales.password == null) {
                contenido = 'Verifique que los campos no esten vacios';
                _showAlert(titulo, contenido);
            }
            else {
                login();
            }
        };

        function login() {
            var promisePost = LoginService.login($scope.credenciales);
            promisePost.then(
                function (datos) {
                    Inversion._setToken(datos.access_token);
                    Inversion._setUsername($scope.credenciales.username);
                    $state.go('tab.cierre');
                },
                function (error) {
                    console.log(JSON.stringify(error));
                }
            )
        }

        function _showAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };
    };
})();