/**
 * Created by Ing. Adrian Vergara on 2/11/2016.
 */
(function () {
    'use strict';
    
    var app = angular.module('starter');
    
    app.controller('ReportesController', ReportesController);
    
    function ReportesController($scope, $rootScope, $state) {
        $rootScope.Csesion = false;
        __init();

        function __init() {
            if(Inversion._getToken() != undefined){
                $state.go('login', {});
            }
            else{

            }
        }
    }
})();
