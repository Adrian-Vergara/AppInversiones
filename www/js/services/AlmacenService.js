/**
 * Created by Ing. Adrian Vergara on 30/11/2016.
 */
(function () {
    'use strict';


    angular.module('starter')
        .service('AlmacenService', AlmacenService);


    function AlmacenService($http) {

        this.GetAlmacenes = function () {
            return $http({
                method: 'GET',
                url: Inversion._getUrl() + 'apiv1/almacen/' + Inversion._getIdUsuario() + '/user',
                headers: {'authorization': 'bearer ' + Inversion._getToken()}
            });
        };
    }
})();