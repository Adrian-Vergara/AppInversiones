/**
 * Created by Ing. Adrian Vergara on 3/11/2016.
 */
(function () {
    'use strict';
    var app = angular.module('starter');

    app.controller('BarController', BarController);

    function BarController($scope, $state) {
        $scope.CerrarSesion = function () {
            $state.go('login', {})
        }
    }
})();