/**
 * Created by Ing. Adrian Vergara on 14/11/2016.
 */
(function () {
    'use strict';

    var app = angular.module('starter');

    app.controller('ReporteVentasController', ReporteVentasController);

    function ReporteVentasController($scope, $state) {
        $scope.generatePDF = generatePDF;
        __init();

        function __init() {
        }

        $scope.ventas =
            [
                {'mes': 'Enero', 'total': 1200000},
                {'mes': 'Febrero', 'total': 2300000},
                {'mes': 'Marzo', 'total': 1700000},
                {'mes': 'Abril', 'total': 3060000},
                {'mes': 'Mayo', 'total': 960000},
                {'mes': 'Junio', 'total': 2750000}
            ];

        $scope.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

        $scope.data = [
            [1200000, 2300000, 1700000, 3060000, 960000, 2750000]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.colors= [{
            backgroundColor: "rgba(92, 184, 92, 0.40)",
            borderColor:"#5cb85c"
        }];

        function generatePDF() {
            /*kendo.drawing.drawDOM($("#ViewReporteVentas")).then(function(group) {
                kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
            });*/

                // Convert the DOM element to a drawing using kendo.drawing.drawDOM
                kendo.drawing.drawDOM($("#ViewVentasPdf"))
                    .then(function(group) {
                        // Render the result as a PDF file
                        return kendo.drawing.exportPDF(group, {
                            paperSize: "auto",
                            margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
                        });
                    })
                    .done(function(data) {
                        // Save the PDF file
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "ReporteVentas.pdf",
                            proxyURL: "templates/ExportVentasPdf.html"
                        });
                    });
        }
        $scope.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true,
            language: {
                "sSearch": "Buscar",
                "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                }
            }
        };
    }
})();