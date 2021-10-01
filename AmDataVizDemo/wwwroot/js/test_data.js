"use strict";
jQuery(document).ready(function ($) {

    $.ajax({
        url: "/Ajax/JobTestDataTotals",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
            generateJobTestDataChart('job-bar-chart', 'column', data);
            var datatable = $('#job-test-data-table').DataTable();
            datatable.clear().draw();
            $.each(data, function (idx, jobDataTotal) {
                datatable.row.add([
                    jobDataTotal.name,
                    jobDataTotal.data[0]
                ])
                .draw()
                .node(); // draw(false)
            });
        }
    });

    $('#all-test-data-table').DataTable({
        ajax: {
            url: '/Ajax/JobTestData',
            dataSrc: ''
        },
        columns: [
            { data: 'jobName' },
            { data: 'supplierName' },
            { data: 'stepName' },
            { data: 'equipmentType' },
            { data: 'kpiName' },
            { data: 'kpiValue' },
            { data: 'kpiUnits' },
        ]
    });   
});

function generateJobTestDataChart(chartId, chartType, data) {
    // generate Highcharts chart
    return Highcharts.chart(chartId, {
        chart: {
            type: chartType
        },
        xAxis: {
            title: {
                text: "Job"
            }
        },
        yAxis: {
            title: {
                text: "Number of Data Points"
            }
        },
        series: data
    });
};