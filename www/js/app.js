(function () {
    'use strict';

    angular.module('starter', ['ionic', 'chart.js'])

        .run(function ($ionicPlatform, $rootScope) {
            $rootScope.Csesion = true;
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider

                /*.state('tab', {
                    url: '/tab',
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })*/
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'templates/menu.html',
                    controller: 'MenuController as menu'
                })
                .state('app.password', {
                    url: '/password',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/tab-password.html',
                            controller: 'PasswordController'
                        }
                    }
                })
                .state('app.cierre', {
                    url: '/cierre',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/tab-cierre.html',
                            controller: 'CierreController'
                        }
                    }
                })
                .state('app.reportes', {
                    url: '/reportes',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/tab-reportes.html',
                            controller: 'ReportesController'
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'LoginController'
                })
                .state('app.reporteVentas', {
                    url: '/reporteVentas',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/tab-RVentas.html',
                            controller: 'ReporteVentasController'
                        }
                    }
                })
                .state('app.reporteGastos', {
                    url: '/reporteGastos',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/tab-RGastos.html',
                            controller: 'ReporteGastosController'
                        }
                    }
                })
                .state('app.reporteInversiones', {
                    url: '/reporteInversiones',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/tab-RInversiones.html',
                            controller: 'ReporteInversionesController'
                        }
                    }
                })
                .state('app.BalanceGeneral', {
                    url: '/BalanceGeneral',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/tab-RBalanceGeneral.html',
                            controller: 'ReporteBalanceGeneralController'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/app/cierre');

        });
})();