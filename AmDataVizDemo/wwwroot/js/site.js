
"use strict";

jQuery(document).ready(function ($) {
    loadSupplierJson();
    $('.tablinks').on('click', function (evt) {
        showChart($(this).attr('data-content'));
        $(this).removeClass('active').addClass('active');
    });
    $('#forecast-arima').on('click', function () {
        console.log("forecasting...");
        loadForecast();
        console.log("done forecasting.");
    });
    $('#job-test-data-table').DataTable();
});

function loadSupplierJson() {
    // you could also pass parameters to the ajax function, for start and rows
    $.ajax({
        url: "/Ajax/SupplierData",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
            generateChart("barchart", "bar", data);
            generateChart("linechart", "line", data);
            generateChart("boxplot", "boxplot", data);
        }
    });
}

function loadForecast() {
    // hide other tab content
    $('.tabcontent').removeClass('hidden').addClass('hidden'); // hide all tabcontent elements

    $.ajax({
        url: "/Ajax/ForecastArima",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
            console.log(data);
        }
    });
}

function showChart(chartName) {
    $('.tabcontent').removeClass('hidden').addClass('hidden'); // hide all tabcontent elements
    $('.tablinks').removeClass('active'); // make all tablinks elements inactive
    $('#' + chartName).removeClass('hidden'); // show the chart
}

function generateChart(chartId, chartType, data) {
    // generate Highcharts chart
    return Highcharts.chart(chartId, {
        chart: {
            type: chartType
        },
        title: {
            text: "Company Production"
        },
        yAxis: {
            title: {
                text: "Production"
            }
        },
        series: data
    });
};
