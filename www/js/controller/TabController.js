/**
 * Created by Ing. Adrian Vergara on 22/11/2016.
 */
(function () {
    'use strict';

    angular.module('starter')
        .controller('TabController', TabController);

    function TabController($scope) {
        $scope.Tabs =
            [
                {'title': 'Registro de Cierre', 'icon': 'ion-clipboard', 'href': '#/tab/cierre', 'nameTemplate': 'tab-cierre'},
                {'title': 'Reportes', 'icon': 'ion-stats-bars', 'href': '#/tab/reportes', 'nameTemplate': 'tab-reportes'},
                {'title': 'Contraseña', 'icon': 'ion-locked', 'href': '#/tab/password', 'nameTemplate': 'tab-password'}
            ];
    }
})();