/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('ReporteBalanceGeneralController', ReporteBalanceGeneralController);

    function ReporteBalanceGeneralController($scope, $state) {
        __init();

        function __init() {
        }

        $scope.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];
        $scope.series = ['Inversiones', 'Gastos', 'Ventas'];
        $scope.data = [
            [780000, 590000, 800000, 810000, 560000, 550000, 400000],
            [380000, 470000, 400000, 190000, 860000, 270000, 900000],
            [1700000, 3100000, 2100000, 1250000, 3420000, 1890000, 4050000]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.colors= [
            {
                backgroundColor: "rgba(162, 224, 252, 0.50)",
                borderColor:"#00ADF9"
            },
            {
                backgroundColor: "rgba(244, 149, 146, 0.50)",
                borderColor:"#d9534f"
            },
            {
                backgroundColor: "rgba(206, 241, 240, 0.50)",
                borderColor:"#46BFBD"
            }
        ];
    }
})();