/**
 * Created by Ing. Adrian Vergara on 30/11/2016.
 */
(function () {
    'use strict';

    angular.module('starter')
        .service('ReportesService', ReportesService);


    function ReportesService($http) {

        this.ReporteVentas = function (datos) {
            return $http({
                method: 'POST',
                url: Inversion._getUrl() + 'apiv1/cierre/ventas',
                headers: {'authorization': 'bearer ' + Inversion._getToken()},
                data: datos
            });
        };

        this.ReportCostos = function (datos) {
            return $http({
                method: 'POST',
                url: Inversion._getUrl() + 'apiv1/cierre/costos',
                headers: {'authorization': 'bearer ' + Inversion._getToken()},
                data: datos
            });
        };

        this.ReporteGastos = function (datos) {
            return $http({
                method: 'POST',
                url: Inversion._getUrl() + 'apiv1/cierre/gastos',
                headers: {'authorization': 'bearer ' + Inversion._getToken()},
                data: datos
            });
        };

        this.ReporteBalance = function (datos) {
            return $http({
                method: 'POST',
                url: Inversion._getUrl() + 'apiv1/cierre/balance',
                headers: {'authorization': 'bearer ' + Inversion._getToken()},
                data: datos
            });
        };


    }
})();