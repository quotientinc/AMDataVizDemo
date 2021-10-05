"use strict";

jQuery(document).ready(function($) {
    $.ajax({
        url: "/Ajax/ProductionData",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function(data) {
            var columnData = createColumnData(data);
            var datatable = generateProductionComparisonDatatable(columnData);
            var chart = generateProductionComparisonChart(data);
            hideSupplierInfo(datatable, chart, columnData);
            createRadioSelection(datatable, chart, columnData);
        }
    });
});

function createColumnData(ajaxData) {
    var columnData = { columns: [{ title: "Id" }], data: [] };
    $.each(ajaxData, function(idsx, column) {
        columnData.columns.push({ title: column.name });
    });
    for (var i = 0; i < ajaxData[0].data.length; i++) {
        var rowToAdd = [i];
        for (var j = 0; j < ajaxData.length; j++) {
            rowToAdd.push(ajaxData[j].data[i]);
        }
        columnData.data.push(rowToAdd);
    }
    return columnData;
}
function generateProductionComparisonDatatable(columnData) {
    var datatable = $('#production-comparison-datatable').DataTable({
        columns: columnData.columns
    });
    $.each(columnData.data, function (idx, data) {
        datatable.row.add(data).draw(false);
    });
    datatable.draw();
    return datatable;
}
function generateProductionComparisonChart(data) {
    return Highcharts.chart('production-comparison-chart', {
        chart: {
            type: 'line'
        },
        xAxis: {
            title: {
                text: "Time"
            }
        },
        yAxis: {
            title: {
                text: "Production Values"
            }
        },
        series: data
    });
}
function hideSupplierInfo(datatable, chart, columnData) {
    for (var i = 1; i < columnData.columns.length - 2; i++) {
        datatable.column(i).visible(false);
        chart.series[i - 1].hide();
        chart.series[i - 1].legendGroup.hide();
    }
}
function createRadioSelection(datatable, chart, columnData) {
    $('input[type=radio][name=supplier]').remove();
    $.each(columnData.columns, function (idx, columnName) {
        if (["Id", "Global Average", "Regional Average"].includes(columnName.title)) {
            return; //continue
        }
        $('#supplier-radio-buttons').append(
            $('<input>').prop({
                type: 'radio',
                id: idx,
                name: 'supplier',
                value: columnName.title
            })
        ).append(
            $('<label>').prop({
                for: idx,
            }).html(columnName.title)
        ).append('<br/>');
    });

    $('input[name=supplier]').on('change', function () {
        hideSupplierInfo(datatable, chart, columnData);
        if ($(this).is(':checked')) {
            datatable.column($(this)[0].id).visible(true);
            chart.series[$(this)[0].id - 1].show();
            chart.series[$(this)[0].id - 1].legendGroup.show();
        }
    });
}

