/**
 * Created by Ing. Adrian Vergara on 2/11/2016.
 */
(function () {
    'use strict';
    
    var app = angular.module('starter');
    
    app.controller('ReportesController', ReportesController);
    
    function ReportesController($scope, $rootScope) {
        $rootScope.Csesion = false;
    }
})();
