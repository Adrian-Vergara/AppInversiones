/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('ReporteVentasController', ReporteVentasController);

    function ReporteVentasController($scope, $ionicModal, AlmacenService, $filter, ReportesService, $rootScope, $ionicPopup) {

        //Declaración de variables
        $rootScope.rol = Inversion._getNombreRol();
        $scope.labels = [];
        $scope.series = [];
        $scope.datos = [];
        $scope.Almacen = {};
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
        $scope.DownloadVentas = DownloadVentas;
        $scope.almacenes = [];
        $scope.ReporteVentas = ReporteVentas;
        $scope.ventas = [];


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

        function ReporteVentas(){
            if($scope.Fecha.FechaIni == '' || $scope.Fecha.FechaFin == ''){
                _showAlert('Error', 'Verifique que los campos no estén vacíos');
            }
            else{
                $scope.Datos.FechaIni = ($filter("date")($scope.Fecha.FechaIni, "yyyy-MM-dd 00:00:00.000"));
                $scope.Datos.FechaFin = ($filter("date")($scope.Fecha.FechaFin, "yyyy-MM-dd 00:00:00.000"));
                if($rootScope.rol == 'Administrador'){
                    var AlmacenTemporal = {};
                    //Toca así porque ricardo tiene full desorden con el nombre de las variables
                    AlmacenTemporal.AlmacenId = $scope.almacenes[0].almacenId;
                    AlmacenTemporal.Nombre = $scope.almacenes[0].nombre;
                    AlmacenTemporal.Direccion = $scope.almacenes[0].direccion;
                    AlmacenTemporal.Correo = $scope.almacenes[0].correo;
                }
                else{
                    var AlmacenTemporal = {};
                    //Toca así porque ricardo tiene full desorden con el nombre de las variables
                    AlmacenTemporal.AlmacenId = $scope.reporte.ListadoAlmacenes.almacenId;
                    AlmacenTemporal.Nombre = $scope.reporte.ListadoAlmacenes.nombre;
                    AlmacenTemporal.Direccion = $scope.reporte.ListadoAlmacenes.direccion;
                    AlmacenTemporal.Correo = $scope.reporte.ListadoAlmacenes.correo;
                }

                //Datos es lo que se va a enviar para hacer la consulta es igual en todos los reportes
                $scope.Datos.ListadoAlmacenes.push(AlmacenTemporal);
                $scope.ventas = [];
                $scope.labels = [];
                $scope.datos = [];
                $scope.titulo = "";
                var promisePost = ReportesService.ReporteVentas($scope.Datos);
                promisePost.then(
                    function (data) {
                        var respuesta = data.data;
                        if(respuesta.errors.length == 0){
                            if(respuesta.data.totalVentas == 0){
                                _showAlert('Error', 'No hay cierres registrados en el rango de fecha establecido');
                            }
                            else{
                                $scope.titulo = respuesta.data.ventasPorAlmacen[0].almacen.nombre;
                                $scope.ventas = respuesta.data.ventasPorAlmacen[0].ventas;
                                Graficar();
                            }
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

        function Graficar() {
            for(var m=0; m < 3; m++){
                $scope.datos[m] = new Array($scope.ventas[0].length);
            }

                //for(var i in $scope.ventas){
                $scope.series = ["Efectivo", "Bancos", "Ventas"];
                for(var j in $scope.ventas){
                    $scope.ventas[j].fecha = new Date($scope.ventas[j].fecha);
                    $scope.labels[j] = ($filter("date")($scope.ventas[j].fecha, 'MMM dd yyyy'));
                    $scope.datos[0][j] = $scope.ventas[j].efectivo;
                    $scope.datos[1][j] = $scope.ventas[j].bancos;
                    $scope.datos[2][j] = $scope.ventas[j].venta;
                }
        }

        $scope.colors= [
            {
                backgroundColor: "rgba(0, 171, 185, 0.30)",
                borderColor: "rgba(0, 171, 185, 1)"
            },
            {
                backgroundColor: "rgba(240, 173, 78, 0.30)",
                borderColor:"rgba(240, 173, 78, 1)"
            },
            {
                backgroundColor: "rgba(92, 184, 92, 0.40)",
                borderColor:"#5cb85c"
            }
        ];

        //Codigo para imprimir, solamente le cambias la url de el template que va a imprimir
        function DownloadVentas() {
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
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            )
        }
        
        function AbrirModalReporte() {
            if($scope.ventas.length == 0){
                _showAlert('Error', 'No hay datos para imprimir');
            }
            else{
                $scope.modal.show();
            }
        };

        function _showAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
        };
    }
})();