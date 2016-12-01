/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('ReporteInversionesController', ReporteInversionesController);

    function ReporteInversionesController($scope, $state, $filter, $rootScope, ReportesService, AlmacenService, $ionicModal, $ionicPopup) {
        //Declaración de variables
        $rootScope.rol = Inversion._getNombreRol();

        $scope.labels = [];
        $scope.series = [];
        $scope.datos = [];

        $scope.Almacen = {};
        $scope.costo = [];
        $scope.inversiones = [];
        $scope.index = -1;
        $scope.Fecha = {'FechaIni': '', 'FechaFin': ''};
        $scope.reporte = {
            'ListadoAlmacenes': []
        };

        $scope.Datos = {
            'FechaIni': '',
            'FechaFin': '',
            'ListadoAlmacenes': []
        };

        //Declaración de funciones
        $scope.AbrirModalReporte = AbrirModalReporte;
        $scope.Graficar = Graficar;
        $scope.DownloadInversiones = DownloadInversiones;
        $scope.almacenes = [];
        $scope.ReporteInversiones = ReporteInversiones;


        //Funcion que se ejecuta cuando carga el controller
        __init();

        function __init() {
            GetAlmacenes();
            CrearModal();
        }

        function CrearModal() {
            $ionicModal.fromTemplateUrl('templates/modalVentas.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });
        };

        function ReporteInversiones(){
            if($scope.Fecha.FechaIni == '' || $scope.Fecha.FechaFin == ''){
                _showAlert('Error', 'Verifique que los campos no estén vacíos');
            }
            else{
                $scope.Datos.FechaIni = ($filter("date")($scope.Fecha.FechaIni, "yyyy-MM-dd 00:00:00.000"));
                $scope.Datos.FechaFin = ($filter("date")($scope.Fecha.FechaFin, "yyyy-MM-dd 00:00:00.000"));
                var AlmacenTemporal = {};
                _upAlmacenesInverisonistas();

                var promisePost = ReportesService.ReporteCostos($scope.Datos);
                promisePost.then(
                    function (data) {
                        var respuesta = data.data;
                        if(respuesta.errors.length == 0){
                            Graficar(respuesta.data.costosPorAlmacen);
                        }
                        else{
                            _showAlert('Error', 'No hay registros de cierre almacenados');
                        }
                    },
                    function (err) {
                        console.log(JSON.stringify(err));
                    }
                )
            }
        };

        function _upAlmacenesInverisonistas() {
            var AlmacenTemporal = {};
            for(var m=0; m < 1; m++){
                AlmacenTemporal.AlmacenId = $scope.almacenes[m].almacenId;
                AlmacenTemporal.Nombre = $scope.almacenes[m].nombre;
                AlmacenTemporal.Direccion = $scope.almacenes[m].direccion;
                AlmacenTemporal.Correo = $scope.almacenes[m].correo;
                $scope.Datos.ListadoAlmacenes.push(AlmacenTemporal);
            }

        }

        function Graficar(datos) {
            for(var m=0; m < datos.length; m++){

                $scope.inversiones[m] = datos[m].costos;
                $scope.series[m] = datos[m].almacen.nombre;

            }

            var k = 0;
            var costo = [];

            for(var i=0; i < $scope.inversiones.length; i++){

                for(var j=0; j < $scope.inversiones[i].length; j++){

                    $scope.labels[k] = $scope.inversiones[i][j].fecha;
                    k++;
                    costo[j] = $scope.inversiones[i][j].total;
                }
                $scope.costo = $scope.inversiones[i];

                $scope.datos.push(costo);
            }
        }

        $scope.colors= [
            {
                backgroundColor: "rgba(0, 171, 185, 0.30)",
                borderColor: "rgba(0, 171, 185, 1)"
            },
            {
                backgroundColor: "rgba(162, 224, 252, 0.30)",
                borderColor:"#00ADF9"
            },
            {
                backgroundColor: "rgba(92, 184, 92, 0.40)",
                borderColor:"#5cb85c"
            }
        ];

        //Codigo para imprimir, solamente le cambias la url de el template que va a imprimir
        function DownloadInversiones() {
            if($scope.ventas.length == 0){
                _showAlert('Error', 'No hay datos para imprimir');
            }
            else{
                kendo.drawing.drawDOM($("#modalVentas"))
                    .then(function(group) {
                        return kendo.drawing.exportPDF(group, {
                            paperSize: "auto",
                            margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
                        });
                    })
                    .done(function(data) {
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "ReporteVentas.pdf",
                            proxyURL: "templates/modalVentas.html"
                        });
                    });
            }
        };

        /**/
        function GetAlmacenes() {
            var promiseGet = AlmacenService.GetAlmacenes();
            promiseGet.then(
                function (data) {
                    var respuesta = data.data;
                    if($rootScope.rol == 'Administrador'){
                        $scope.almacenes = respuesta.admin;
                    }
                    else{
                        $scope.almacenes = respuesta.inversiones;
                    }
                    console.log($scope.almacenes);
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            )
        }

        function AbrirModalReporte() {
            $scope.modal.show();
        };

        function _showAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };
    }
})();