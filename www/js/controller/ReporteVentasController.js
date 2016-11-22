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

        $scope.ventas =
            [
                {'mes': 'Enero', 'total': 1200000},
                {'mes': 'Febrero', 'total': 2300000},
                {'mes': 'Marzo', 'total': 1700000},
                {'mes': 'Abril', 'total': 3060000},
                {'mes': 'Mayo', 'total': 960000},
                {'mes': 'Junio', 'total': 2750000}
            ];

        $scope.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

        $scope.data = [
            [1200000, 2300000, 1700000, 3060000, 960000, 2750000]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.colors= [{
            backgroundColor: "rgba(92, 184, 92, 0.40)",
            borderColor:"#5cb85c"
        }];
    }
})();