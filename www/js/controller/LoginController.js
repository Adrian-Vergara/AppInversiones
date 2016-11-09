/**
 * Created by Ing. Adrian Vergara on 2/11/2016.
 */
(function(){
    'use strict';

    var app = angular.module('starter');

    app.controller('LoginController', LoginController);

    function LoginController($state, $ionicPopup, $scope, $rootScope){
        $rootScope.Csesion = true;
        $scope.credenciales = {};
        $scope.loading = false;

        $scope.login = function(){
            var titulo = "Error";
            var contenido;
            if($scope.credenciales.email == "" || $scope.credenciales.email == null || $scope.credenciales.password == "" || $scope.credenciales.password == null) {
                contenido = 'Verifique que los campos no esten vacios';
                _showAlert(titulo,contenido);
            }
            else {
                if($scope.credenciales.email == "adrianvergara22@gmail.com" && $scope.credenciales.password == "123123123"){
                    $state.go('tab.cierre', {});
                }
                else{
                    contenido = "Datos Inválidos";
                    _showAlert(titulo,contenido);
                }
            }
        };

        function _showAlert(titulo, contenido){
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };
    };
})();