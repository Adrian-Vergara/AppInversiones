(function(){
    'use strict';

    angular.module('starter')
        .controller('MenuController', MenuController);

    function MenuController($state, $ionicSideMenuDelegate, $scope)
    {
        var vm = this;

        vm.ItemMenu =
            [
                {'item': 'Cambiar Contraseña', 'icon': 'ion-locked', 'sref': 'app.password'},
                {'item': 'Registro de Cierre', 'icon': 'ion-clipboard', 'sref': 'app.cierre'},
                {'item': 'Reportes', 'icon': 'ion-stats-bars', 'sref': 'app.reportes'},
                {'item': 'Almacenes', 'icon': 'ion-ios-home', 'sref': 'app.almacen'}
            ];

        /*$ionicHistory.nextViewOptions({
            disableBack: true
        });*/
        vm.toggleLeft = function(){
            $ionicSideMenuDelegate.toggleLeft();
        };

        vm.cerrar_sesion = function(){
            localStorage.clear();
            $state.go('login');
        };

        $scope.$on('$ionicView.beforeEnter', function(){
            _init();
        });

        function _init (){
            vm.nombre_completo = Inversion._getNombreCompleto();
        };
    }
})();
