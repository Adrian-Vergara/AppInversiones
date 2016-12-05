/**
 * Created by Ing. Adrian Vergara on 30/11/2016.
 */
(function () {
    'use strict';


    angular.module('starter')
        .service('PasswordService', PasswordService);


    function PasswordService($http) {

        this.ChangePassword = function (datos) {
            return $http({
                method: 'POST',
                url: Inversion._getUrl() + 'apiv1/accounts/changepassword',
                headers: {'authorization': 'bearer ' + Inversion._getToken()},
                data: datos
            });
        };
    }
})();