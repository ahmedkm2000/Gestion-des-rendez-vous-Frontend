import React from 'react';
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";


export const DataTable = ()=>{
    if (!$.fn.DataTable.isDataTable("#myTable")) {
        $(document).ready(function () {
            setTimeout(function () {
                $("#table").DataTable({
                    pageLength: 20,
                    buttons: [
                        {
                            extend: "pageLength",
                            className: "btn btn-secondary bg-secondary",
                        },
                        {
                            extend: "csv",
                            className: "btn btn-secondary bg-secondary",
                        },
                        {
                            extend: "print",
                            className: "btn btn-secondary bg-secondary",
                        },
                    ],

                    fnRowCallback: function (
                        nRow,
                    ) {
                        return nRow;
                    },
                    fnDrawCallback:function(){
                        $("input[type='search']").attr("id", "searchBox");
                        $('#dialPlanListTable').css('cssText', "margin-top: 0px !important;");
                        $('#searchBox').css("width", "200px").focus();
                        $('#searchBox').css("margin-bottom", "20px")
                    },
                    lengthMenu: [
                        [10, 20, 30, 50, -1],
                        [10, 20, 30, 50, "All"],
                    ],

                    columnDefs: [
                        {
                            targets: 0,
                            render: function (data, type, row, meta) {
                                return type === "export" ? meta.row + 1 : data;
                            },
                        },
                    ],
                });
            }, 1000);
        })
    }
}
export const DestoryDataTable = ()=>{
            var table = $('#table').DataTable();
            table.destroy();
}