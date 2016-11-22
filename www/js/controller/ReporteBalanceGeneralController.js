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

        $scope.BalanceGeneral =
            [
                {'mes': 'Enero', 'totalVentas': 1700000, 'totalGastos': 380000, 'totalInversiones': 780000},
                {'mes': 'Febrero', 'totalVentas': 3100000, 'totalGastos': 470000, 'totalInversiones': 590000},
                {'mes': 'Marzo', 'totalVentas': 2100000, 'totalGastos': 400000, 'totalInversiones': 800000},
                {'mes': 'Abril', 'totalVentas': 1250000, 'totalGastos': 190000, 'totalInversiones': 810000},
                {'mes': 'Mayo', 'totalVentas': 3420000, 'totalGastos': 860000, 'totalInversiones': 560000},
                {'mes': 'Junio', 'totalVentas': 1890000, 'totalGastos': 270000, 'totalInversiones': 550000},
                {'mes': 'julio', 'totalVentas': 4050000, 'totalGastos': 900000, 'totalInversiones': 400000}
            ];

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.colors= [
            {
                backgroundColor: "rgba(162, 224, 252, 0.30)",
                borderColor:"#00ADF9"
            },
            {
                backgroundColor: "rgba(244, 149, 146, 0.30)",
                borderColor:"#d9534f"
            },
            {
                backgroundColor: "rgba(92, 184, 92, 0.30)",
                borderColor:"#5cb85c"
            }
        ];
    }
})();