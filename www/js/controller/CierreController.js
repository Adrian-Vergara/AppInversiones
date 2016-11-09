/**
 * Created by Ing. Adrian Vergara on 2/11/2016.
 */
(function(){
    'use strict';

    angular.module('starter')
        .controller('CierreController', CierreController);

    function CierreController($ionicPopup, $scope, LoginService, $state){
        $scope.Inversion = {'TotalPlaza': 0, 'TotalFactura': 0, 'TotalInversiones': 0};
        $scope.Gastos = {};
        $scope.Ventas = {'TotalEfectivo': 0, 'TotalBancos': 0, 'TotalVentas': 0};

        $scope.CalcularTotalVentas = function () {
            $scope.Ventas.TotalVentas = parseInt($scope.Ventas.TotalEfectivo) + parseInt($scope.Ventas.TotalBancos);
        };

        $scope.CalcularTotalInversiones = function () {
            $scope.Inversion.TotalInversiones = parseInt($scope.Inversion.TotalPlaza) + parseInt($scope.Inversion.TotalFactura);
        };

        $scope.RegistrarInversion = function () {
            var titulo;
            var contenido;
            if(($scope.Inversion.TotalPlaza != undefined && $scope.Inversion.TotalPlaza != null) || ($scope.Inversion.TotalFactura != undefined && $scope.Inversion.TotalFactura != null)){
                titulo = "Enohorabuena!";
                contenido = "Datos Almacenados Exitosamente";
            }
            else{
                titulo = "Error!";
                contenido = "Verifique que los campos no estén vacíos";
            }
            _showAlert(titulo, contenido);
            $scope.Inversion = {};
        };

        $scope.RegistrarGastos = function () {
            var titulo;
            var contenido;
            if($scope.Gastos.TotalGastos != undefined && $scope.Gastos.TotalGastos != null){
                titulo = "Enohorabuena!";
                contenido = "Datos Almacenados Exitosamente";
            }
            else{
                titulo = "Error!";
                contenido = "Verifique que los campos no estén vacíos";
            }
            _showAlert(titulo, contenido);
            $scope.Gastos = {};
        };

        $scope.RegistrarVentas = function () {
            var titulo;
            var contenido;
            if(($scope.Ventas.TotalEfectivo != undefined && $scope.Ventas.TotalEfectivo != null && $scope.Ventas.TotalEfectivo != 0) || ($scope.Ventas.TotalBancos != undefined && $scope.Ventas.TotalBancos != null && $scope.Ventas.TotalBancos != 0)){
                titulo = "Enohorabuena!";
                contenido = "Datos Almacenados Exitosamente";
            }
            else{
                titulo = "Error!";
                contenido = "Verifique que los campos no estén vacíos";
            }
            _showAlert(titulo, contenido);
        };

        __init();

        function __init() {
            if(Inversion._getToken() != undefined){
                $state.go('login', {});
            }
            else{

            }
        }

        function _showAlert(titulo, contenido){
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };

        /*function GetUser(){
            var promiseGet = LoginService.GetUser();
            promiseGet.then(
                function (data) {
                    var respuesta = data.data;
                    console.log(respuesta);
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            )
        }*/
    };
})();