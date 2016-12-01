/**
 * Created by Ing. Adrian Vergara on 2/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('LoginController', LoginController);

    function LoginController($ionicPopup, $scope, $state, LoginService, CierreService, $rootScope) {
        $scope.credenciales = {};
        $scope.loading = false;

        _redireccionar();

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
                    GetUser();
                },
                function (error) {
                    if(error.error == "invalid_grant"){
                        _showAlert('Error', 'Credenciales Inválidas');
                    }
                    console.log(JSON.stringify(error));
                }
            )
        }

        function GetUser() {
            var promiseGet = CierreService.GetUser();
            promiseGet.then(
                function (data) {
                    var respuesta = data.data;
                    Inversion._setNombreCompleto(respuesta.fullName);
                    Inversion._setIdUsuario(respuesta.id);
                    Inversion._setNombreRol(respuesta.roles[0]);
                    $rootScope.rol = Inversion._getNombreRol();
                    _redireccionar();

                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            )
        };

        function _showAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };

        function _redireccionar() {
            if (Inversion._getToken() != undefined){
                if (Inversion._getNombreRol() == "inversionista"){
                    $state.go('app.reportes');
                }else if (Inversion._getNombreRol() == "Administrador"){
                    $state.go('app.cierre');
                }else {
                    $state.go('login');
                }
            }
        }
    };
})();