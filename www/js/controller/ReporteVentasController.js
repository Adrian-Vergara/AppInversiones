/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('ReporteVentasController', ReporteVentasController);

    function ReporteVentasController($scope, $state) {
        __init();

        function __init() {
        }

        $scope.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

        $scope.data = [
            [1200000, 2300000, 1700000, 3060000, 960000, 2750000]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.colors= [{
            backgroundColor: "rgba(206, 241, 240, 0.50)",
            borderColor:"#46BFBD"
        }];
    }
})();