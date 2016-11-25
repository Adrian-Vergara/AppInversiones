/**
 * Created by Developer on 25/11/2016.
 */
(function () {
    'use strict';
    var app = angular.module('starter');

    app.controller('AlmacenController', AlmacenController);

    function AlmacenController($scope, $state, $rootScope) {
        $rootScope.almacenes =
            [
                {'idAlmacen': 1, 'nombreAlmacen': 'Fruver del Valle'},
                {'idAlmacen': 2, 'nombreAlmacen': 'Surti Fruver'},
                {'idAlmacen': 3, 'nombreAlmacen': 'Almacenes Éxito'},
                {'idAlmacen': 4, 'nombreAlmacen': 'Carrefour'}
            ];
        $rootScope.AlmacenesSeleccionados = [];
        $scope.check = false;
        $scope.checkAlmacenes = false;


        $scope.chequearAlmacen = chequearAlmacen;
        $scope.checkearAlmacenes = checkearAlmacenes;

        function chequearAlmacen(almacen, index) {
            if(almacen.activo){
                $rootScope.AlmacenesSeleccionados.push(almacen);
            }
            else{
                if($rootScope.AlmacenesSeleccionados.length == 1){
                    $rootScope.AlmacenesSeleccionados = [];
                }
                else{
                    $rootScope.AlmacenesSeleccionados.splice($rootScope.AlmacenesSeleccionados.indexOf(almacen), 1);
                }
            }
            console.log($rootScope.AlmacenesSeleccionados);
        };
        
        function checkearAlmacenes() {
            if($scope.checkAlmacenes == undefined)
            {
                $scope.checkAlmacenes = true;
            }
            else
            {
                $scope.checkAlmacenes = !$scope.checkAlmacenes;
            }
            alert($scope.checkAlmacenes);
            if($scope.checkAlmacenes == true){
                $rootScope.AlmacenesSeleccionados = [];
                for(var i in $rootScope.almacenes){
                    $rootScope.almacenes[i].activo = true;
                    $rootScope.AlmacenesSeleccionados.push($rootScope.almacenes[i]);
                }
                console.log($rootScope.AlmacenesSeleccionados);
            }
            else{
                for(var i in $rootScope.almacenes){
                    $rootScope.almacenes[i].activo = false;
                    $rootScope.AlmacenesSeleccionados.push($rootScope.almacenes[i]);
                }
                $rootScope.AlmacenesSeleccionados = [];
                console.log($rootScope.AlmacenesSeleccionados);
            }
        }
    }
})();