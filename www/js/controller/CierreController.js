/**
 * Created by Ing. Adrian Vergara on 2/11/2016.
 */
(function () {
    'use strict';

    angular.module('starter')
        .controller('CierreController', CierreController);

    function CierreController($ionicPopup, $scope, CierreService, $state) {
        $scope.Inversion = {'TotalPlaza': 0, 'TotalFactura': 0, 'TotalInversiones': 0};
        $scope.Gastos = {};
        $scope.Ventas = {'TotalEfectivo': 0, 'TotalBancos': 0, 'TotalVentas': 0};
        $scope.Cierre =
        {
            'Costos': 0,
            'Facturas': 0,
            'Gastos': 0,
            'Efectivo': 0,
            'Bancos': 0
        };
        $scope.TotalVentas = 0;
        $scope.TotalInversiones = 0;

        $scope.CalcularTotalVentas = function () {
            $scope.TotalVentas = parseInt($scope.Cierre.Efectivo) + parseInt($scope.Cierre.Bancos);
        };

        $scope.CalcularTotalInversiones = function () {
            $scope.TotalInversiones = parseInt($scope.Cierre.Costos) + parseInt($scope.Cierre.Facturas);
        };

        $scope.RegistrarCierre = function () {
            if($scope.Cierre.Costos >= 0 && $scope.Cierre.Facturas >= 0 && $scope.Cierre.Gastos && $scope.Cierre.Efectivo >= 0 && $scope.Cierre.Bancos >= 0){
                RegistrarCierre();
            }
            else{
                _showAlert('Error', 'Verifique que no hayan valaores menores que cero');
            }
        };

        __init();

        function __init() {
            GetUser();
        }

        function _showAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };

        function GetUser() {
            var promiseGet = CierreService.GetUser();
            promiseGet.then(
                function (data) {
                    var respuesta = data.data;
                    Inversion._setNombreCompleto(respuesta.fullName);
                    Inversion._setIdUsuario(respuesta.id);
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            )
        };

        function RegistrarCierre() {
            var promisePost = CierreService.RegistrarCierre($scope.Cierre);
            promisePost.then(
                function (data) {
                    var respuesta = data.data;
                    var titulo;
                    var contenido;
                    if(respuesta.errors.length == 0){
                        titulo = "Enhorabuena!";
                        $scope.Cierre =
                        {
                            'Costos': 0,
                            'Facturas': 0,
                            'Gastos': 0,
                            'Efectivo': 0,
                            'Bancos': 0
                        };
                    }
                    else{
                        titulo = "Error!";
                    }
                    contenido = respuesta.mensagge;
                    _showAlert(titulo,contenido);
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            )
        }
    };
})();