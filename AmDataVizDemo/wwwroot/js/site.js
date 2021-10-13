
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

    //generateForecast(); 

    //comment out one or the other supplier map to see
    generateSupplierButtonMap(); //show: (1) supplier map with togglable layer controls for supplier materials (polymer, glass, metal)
    //generateGenMap(); //shows: button toggle for layers
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
            title: {
                text: "Extrude Hone"
            },
            xAxis: {
                type: "datetime",
                title: { text: "Date" }
            },
            yAxis: {
                title: {
                    text: "Production amount"
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            series: [
                {
                    name: "Extrude Hone",
                    data: [
                        [43878.0, 0],
                        [43879.0, 50],
                        [43880.0, 60],
                        [43881.0, 72],
                        [43882.0, 86],
                        [43883.0, 104],
                        [43884.0, 124],
                        [43885.0, 149],
                        [43886.0, 179],
                        [43887.0, 215],
                        [43888.0, 258],
                        [43889.0, 310],
                        [43890.0, 372],
                        [43891.0, 446],
                        [43892.0, 535],
                        [43893.0, 642],
                        [43894.0, 770],
                        [43895.0, 924],
                        [43896.0, 1109],
                        [43897.0, 1331],
                        [43898.0, 1597],
                        [43899.0, 1917],
                        [43900.0, 2300],
                        [43901.0, 2760],
                        [43902.0, 3312],
                        [43903.0, 2269],
                        [43904.0, 2386],
                        [43905.0, 2502],
                        [43906.0, 2618],
                        [43907.0, 2734],
                        [43908.0, 2850],
                        [43909.0, 2966],
                        [43910.0, 3082],
                        [43911.0, 3198],
                        [43912.0, 3315],
                        [43913.0, 3431],
                        [43914.0, 3547],
                        [43915.0, 3663],
                        [43916.0, 3779],
                        [43917.0, 3895],
                        [43918.0, 4011],
                        [43919.0, 4128],
                        [43920.0, 4244],
                        [43921.0, 6366],
                        [43922.0, 9548],
                        [43923.0, 8498],
                        [43924.0, 7448],
                        [43925.0, 6398],
                        [43926.0, 5348],
                        [43927.0, 4298],
                        [43928.0, 3248],
                        [43929.0, 2198],
                        [43930.0, 1148],
                        [43931.0, 1378],
                        [43932.0, 1654],
                        [43933.0, 1984],
                        [43934.0, 2381],
                        [43935.0, 2857],
                        [43936.0, 3429],
                        [43937.0, 4115],
                        [43938.0, 4938],
                        [43939.0, 5925],
                        [43940.0, 7110],
                        [43941.0, 8532],
                        [43942.0, 10239],
                        [43943.0, 12287],
                        [43944.0, 14744],
                        [43945.0, 17693],
                        [43946.0, 21231],
                        [43947.0, 25477],
                        [43948.0, 30573],
                        [43949.0, 36688],
                        [43950.0, 44025],
                        [43951.0, 52830],
                        [43952.0, 42264],
                        [43953.0, 33811],
                        [43954.0, 27049],
                        [43955.0, 32459],
                        [43956.0, 38951],
                        [43957.0, 46741],
                        [43958.0, 56089],
                        [43959.0, 44871],
                        [43960.0, 35897],
                        [43961.0, 28718],
                        [43962.0, 22974],
                        [43963.0, 18379],
                        [43964.0, 14703],
                        [43965.0, 11763],
                        [43966.0, 14115],
                        [43967.0, 16938],
                        [43968.0, 20326],
                        [43969.0, 24391],
                        [43970.0, 29269],
                        [43971.0, 35123],
                        [43972.0, 42148],
                        [43973.0, 50577],
                        [43974.0, 60693],
                        [43975.0, 72831]
                    ]
                },
                {
                    name: "Forecast",
                    data: [
                        [43976.0, 87398, 87398],
                        [43977.0, 99051.04664],
                        [43978.0, 108373.9016],
                        [43979.0, 115832.2064],
                        [43980.0, 121798.8668],
                        [43981.0, 126572.2084],
                        [43982.0, 130390.8924],
                        [43983.0, 133445.8481],
                        [43984.0, 135889.8194],
                        [43985.0, 137845.0019],
                        [43986.0, 139409.1523]
                    ],
                    color: "#000000" //black
                },
                {
                    name: "80th Percentile",
                    data: [
                        [43976.0, 87398, 87398],
                        [43977.0, 94982.81843, 103119.2749],
                        [43978.0, 99997.56687, 116750.2364],
                        [43979.0, 102844.6119, 128819.8008],
                        [43980.0, 104110.6241, 139487.1094],
                        [43981.0, 104214.613, 148929.8039],
                        [43982.0, 103463.5555, 157318.2293],
                        [43983.0, 102085.9294, 164805.7667],
                        [43984.0, 100253.3216, 171526.3173],
                        [43985.0, 98095.21609, 177594.7878],
                        [43986.0, 95709.52128, 183108.7834]
                    ],
                    type: "arearange",
                    lineWidth: 0,
                    linkedTo: ":previous",
                    color: Highcharts.getOptions().colors[0],
                    fillOpacity: 0.3
                }
            ]
        }
    );
};

function generateGenMap() {
    //setting map variables: 
    var all = L.layerGroup();
    var polymer = L.layerGroup();
    var glass = L.layerGroup();
    var metal = L.layerGroup();
    var url = "/Ajax/GetCompanyLocu";
    var promise = $.getJSON(url);
    promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].material == "GLASS") {
                L.circleMarker([data[i].lat, data[i].lon], { radius: 5, fillOpacity: 0.6, color: "orange" }).bindPopup("Name: " + data[i].company_Name + "<br /> Type: " + data[i].material).addTo(glass).addTo(all);
                } else if (data[i].material == "POLYMER") {
                L.circleMarker([data[i].lat, data[i].lon], { radius: 5, fillOpacity: 0.6, color: "green" }).bindPopup("Name: " + data[i].company_Name + "<br /> Type: " + data[i].material).addTo(polymer).addTo(all);
                } else {
                L.circleMarker([data[i].lat, data[i].lon], { radius: 5, fillOpacity: 0.6, color: "purple" }).bindPopup("Name: " + data[i].company_Name + "<br /> Type: " + data[i].material).addTo(metal).addTo(all);
                }
            // marker = L.circleMarker([data[i].lat, data[i].lon], { radius: 5, fillOpacity: 0.6, color: "orange" });
            // layerGroup.addLayer(companies);
        }
    });

    var map = L.map('map', {
        center: [40.63, -89.39], zoom: 5, layers: [all] // set the default the later
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var overlays = {
        "All" : all,
        "Glass": glass,
        "Polymer": polymer,
        "Metal": metal
    };
    L.control.layers(overlays, null).addTo(map);
};

//map with the buttons.
function generateSupplierButtonMap() {
    var map = L.map("map", { center: [40.63, -89.39] }); L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    var url = "https://raw.githubusercontent.com/quotientinc/AMDataVizDemo/DashboardChange/AmDataVizDemo/wwwroot/data/supplierLatLon.json";
    var promise = $.getJSON(url);
    promise.then(function (data) {
        var jsonFeatures = [];
        data.forEach(function (point) {
            var lat = point.lat;
            var lon = point.lon;
            var feature = {
                type: "Feature",
                properties: point,
                geometry: {
                    type: "Point",
                    coordinates: [lon, lat]
                }
            };
            jsonFeatures.push(feature);
        });
        var gj = {
            type: "FeatureCollection",
            features: jsonFeatures
        };
        //plotting everything:
        var allbusinesses = L.geoJson(gj, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillOpacity: 0.7,
                    color: "black",
                    weight: 0.75
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.Company_Name).openPopup();
                });
            }
        });
        //split by material type:
        //polymer
        var polymer = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.Material == "POLYMER";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillOpacity: 0.7,
                    color: "purple",
                    weight: 0.75
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.Company_Name).openPopup();
                });
            }
        });
        //metal
        var metal = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.Material == "METAL";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillOpacity: 0.7,
                    color: "orange",
                    weight: 0.75
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.Company_Name).openPopup();
                });
            }
        });
        //glass
        var glass = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.Material == "GLASS";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillOpacity: 0.7,
                    color: "green",
                    weight: 0.75
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.Company_Name).openPopup();
                });
            }
        });
        //sets the zoom to auto-focus everyone on the map
        map.fitBounds(allbusinesses.getBounds(), {
            padding: [50, 50]
        });
        //add the layers onto the map:
        allbusinesses.addTo(map);
        glass.addTo(map);
        metal.addTo(map);
        polymer.addTo(map);
        //make the buttons toggleable
        $("#allSup").click(function () {
            map.removeLayer(allbusinesses);
            map.addLayer(glass);
            map.addLayer(metal);
            map.addLayer(polymer);
        });
        $("#BCer").click(function () {
            map.removeLayer(allbusinesses);
            map.addLayer(glass);
            map.removeLayer(metal);
            map.removeLayer(polymer);
        });
        $("#BMet").click(function () {
            map.removeLayer(allbusinesses);
            map.removeLayer(glass);
            map.addLayer(metal);
            map.removeLayer(polymer);
        });
        $("#BPol").click(function () {
            map.removeLayer(allbusinesses);
            map.removeLayer(glass);
            map.removeLayer(metal);
            map.addLayer(polymer);
        });

    });
}