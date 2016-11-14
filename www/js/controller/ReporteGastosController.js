/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('ReporteGastosController', ReporteGastosController);

    function ReporteGastosController($scope, $state) {
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
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        colours: ['#46BFBD']
                    }
                ]
            }
        };

        $scope.colors= [{
            backgroundColor:"#F49592",
            borderColor:"#d9534f"
        }];
    }
})();