/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('PasswordController',PasswordController);

    function PasswordController($scope, $ionicPopup, PasswordService) {
        $scope.Password = {};

        $scope.CambiarPassword = function () {
            if($scope.Password.OldPassword != null && $scope.Password.OldPassword != undefined && $scope.Password.NewPassword != null && $scope.Password.NewPassword != undefined && $scope.Password.ConfirmPassword != null && $scope.Password.ConfirmPassword != undefined){
                if($scope.Password.NewPassword == $scope.Password.ConfirmPassword){
                    ChangePassword();
                    /*_showAlert('Enhorabuena!', 'Datos Actualizados Exitosamente!');
                    $scope.Password = {};*/
                }
                else{
                    _showAlert('Error', 'Las contraseñas no coinciden');
                }
            }
            else{
                _showAlert('Error', 'Verifique que los campos no estén vacíos');
            }
        };

        function ChangePassword() {
            var promisePost = PasswordService.ChangePassword($scope.Password);
            promisePost.then(
                function (data) {
                    var respuesta = data.data;
                    if(respuesta == ""){
                        _showAlert('Enhorabuena!', 'Datos Actualizados Exitosamente');
                        $scope.Password = {};
                    }
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            )
        }

        function _showAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };
    }
})();