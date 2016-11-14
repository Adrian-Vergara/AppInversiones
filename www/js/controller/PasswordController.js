/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('PasswordController',PasswordController);

    function PasswordController($scope, $ionicPopup) {
        $scope.nombre = Inversion._getNombreCompleto();
        $scope.Password = {};

        $scope.CambiarPassword = function () {
            if($scope.Password.OldPassword != null && $scope.Password.OldPassword != undefined && $scope.Password.NewPassword != null && $scope.Password.NewPassword != undefined && $scope.Password.NewPassword2 != null && $scope.Password.NewPassword2 != undefined){
                if($scope.Password.NewPassword == $scope.Password.NewPassword2){
                    _showAlert('Enhorabuena!', 'Datos Actualizados Exitosamente!');
                    $scope.Password = {};
                }
                else{
                    _showAlert('Error', 'Las contraseñas no coinciden');
                }
            }
            else{
                _showAlert('Error', 'Verifique que los campos no estén vacíos');
            }
        };

        function CambiasPassword() {
            /*Codigo*/
        }

        function _showAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };
    }
})();