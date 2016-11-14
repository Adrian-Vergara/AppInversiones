/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';


    angular.module('starter')
        .service('CierreService', CierreService);


    function CierreService($http) {

        this.GetUser = function () {
            return $http({
                method: 'GET',
                url: Inversion._getUrl() + 'apiv1/accounts/user/' + Inversion._getUsername(),
                headers: {'authorization': 'bearer ' + Inversion._getToken()}
            });
        };

        this.RegistrarCierre = function (cierre) {
            cierre.UserName = Inversion._getUsername();
            return $http({
                method: 'POST',
                url: Inversion._getUrl() + 'apiv1/create/cierre',
                headers: {'authorization': 'bearer ' + Inversion._getToken()},
                data: cierre
            })
        }

    }
})();
