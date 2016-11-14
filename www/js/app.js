(function () {
  'use strict';

  angular.module('starter', ['ionic','chart.js'])

      .run(function($ionicPlatform, $rootScope) {
          $rootScope.Csesion = true;
        $ionicPlatform.ready(function() {
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
          }
          if (window.StatusBar) {
            StatusBar.styleDefault();
          }
        });
      })

      .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('tab', {
              url: '/tab',
              abstract: true,
              templateUrl: 'templates/tabs.html'
            })
            .state('tab.cierre', {
              url: '/cierre',
              views: {
                'tab-cierre': {
                  templateUrl: 'templates/tab-cierre.html',
                  controller: 'CierreController'
                }
              }
            })
            .state('tab.reportes', {
              url: '/reportes',
              views: {
                'tab-reportes': {
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
            .state('tab.reporteVentas', {
                url: '/reporteVentas',
                views:{
                    'tab-reportes':{
                        templateUrl: 'templates/tab-RVentas.html'
                    }
                }
            })
            .state('tab.reporteGastos', {
                url: '/reporteGastos',
                views:{
                    'tab-reportes':{
                        templateUrl: 'templates/tab-RGastos.html'
                    }
                }
            })
            .state('tab.reporteInversiones', {
                url: '/reporteInversiones',
                views:{
                    'tab-reportes':{
                        templateUrl: 'templates/tab-RInversiones.html'
                    }
                }
            })
            .state('tab.BalanceGeneral', {
                url: '/BalanceGeneral',
                views:{
                    'tab-reportes':{
                        templateUrl: 'templates/tab-RBalanceGeneral.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/login');

      });
})();