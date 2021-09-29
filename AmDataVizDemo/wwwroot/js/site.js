
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

    generateForecast();
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

function generateForecast() {
    // generate Highcharts chart
    return Highcharts.chart("forecastline", {
        chart: {
            type: "line"
        },
        title: {
            text: "Extrude Hone Forecast"
        },
        plotOptions: {
            series: {
                fillOpacity: .15,
                shadow: false,
                borderWidth: 0,
                stacking: 'normal',
                compare: 'percent',
            }
        },
        yAxis: {
            title: {
                text: "Production"
            }
        },
        series: [{
            name: 'Forecast',
            data: [0, 50, 60, 72, 86, 104, 124, 149, 179, 215, 258, 310, 372, 446, 535, 642, 770, 924, 1109, 1331, 1597, 1917, 2300, 2760, 3312, 2269, 2386, 2502, 2618, 2734, 2850, 2966, 3082, 3198, 3315, 3431, 3547, 3663, 3779, 3895, 4011, 4128, 4244, 6366, 9548, 8498, 7448, 6398, 5348, 4298, 3248, 2198, 1148, 1378, 1654, 1984, 2381, 2857, 3429, 4115, 4938, 5925, 7110, 8532, 10239, 12287, 14744, 17693, 21231, 25477, 30573, 36688, 44025, 52830, 42264, 33811, 27049, 32459, 38951, 46741, 56089, 44871, 35897, 28718, 22974, 18379, 14703, 11763, 14115, 16938, 20326, 24391, 29269, 35123, 42148, 50577, 60693, 72831, 87398, 99051.04664, 108373.9016, 115832.2064, 121798.8668, 126572.2084, 130390.8924, 133445.8481, 135889.8194, 137845.0019, 139409.1523],
            color: '#4F6272' //black coral
        }, {
            name: 'High 80',
            stack: 'A',
            data: [0, 50, 60, 72, 86, 104, 124, 149, 179, 215, 258, 310, 372, 446, 535, 642, 770, 924, 1109, 1331, 1597, 1917, 2300, 2760, 3312, 2269, 2386, 2502, 2618, 2734, 2850, 2966, 3082, 3198, 3315, 3431, 3547, 3663, 3779, 3895, 4011, 4128, 4244, 6366, 9548, 8498, 7448, 6398, 5348, 4298, 3248, 2198, 1148, 1378, 1654, 1984, 2381, 2857, 3429, 4115, 4938, 5925, 7110, 8532, 10239, 12287, 14744, 17693, 21231, 25477, 30573, 36688, 44025, 52830, 42264, 33811, 27049, 32459, 38951, 46741, 56089, 44871, 35897, 28718, 22974, 18379, 14703, 11763, 14115, 16938, 20326, 24391, 29269, 35123, 42148, 50577, 60693, 72831, 87398, 103119.2749, 116750.2364, 128819.8008, 139487.1094, 148929.8039, 157318.2293, 164805.7667, 171526.3173, 177594.7878, 183108.7834],
            color: '#51CB20' //lime green
        }, {
            name: 'Low 80',
            stack: 'A',
            data: [0, 50, 60, 72, 86, 104, 124, 149, 179, 215, 258, 310, 372, 446, 535, 642, 770, 924, 1109, 1331, 1597, 1917, 2300, 2760, 3312, 2269, 2386, 2502, 2618, 2734, 2850, 2966, 3082, 3198, 3315, 3431, 3547, 3663, 3779, 3895, 4011, 4128, 4244, 6366, 9548, 8498, 7448, 6398, 5348, 4298, 3248, 2198, 1148, 1378, 1654, 1984, 2381, 2857, 3429, 4115, 4938, 5925, 7110, 8532, 10239, 12287, 14744, 17693, 21231, 25477, 30573, 36688, 44025, 52830, 42264, 33811, 27049, 32459, 38951, 46741, 56089, 44871, 35897, 28718, 22974, 18379, 14703, 11763, 14115, 16938, 20326, 24391, 29269, 35123, 42148, 50577, 60693, 72831, 87398, 94982.81843, 99997.56687, 102844.6119, 104110.6241, 104214.613, 103463.5555, 102085.9294, 100253.3216, 98095.21609, 95709.52128],
            color: '#51CB20' //lime green
            },
            {
                name: "Extrude Hone",
                data: [0, 50, 60, 72, 86, 104, 124, 149, 179, 215, 258, 310, 372, 446, 535, 642, 770, 924, 1109, 1331, 1597, 1917, 2300, 2760, 3312, 2269, 2386, 2502, 2618, 2734, 2850, 2966, 3082, 3198, 3315, 3431, 3547, 3663, 3779, 3895, 4011, 4128, 4244, 6366, 9548, 8498, 7448, 6398, 5348, 4298, 3248, 2198, 1148, 1378, 1654, 1984, 2381, 2857, 3429, 4115, 4938, 5925, 7110, 8532, 10239, 12287, 14744, 17693, 21231, 25477, 30573, 36688, 44025, 52830, 42264, 33811, 27049, 32459, 38951, 46741, 56089, 44871, 35897, 28718, 22974, 18379, 14703, 11763, 14115, 16938, 20326, 24391, 29269, 35123, 42148, 50577, 60693, 72831, 87398],
                color: '#000000' //black 
            }],
    });
};
