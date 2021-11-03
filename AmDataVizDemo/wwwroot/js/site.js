"use strict";

jQuery(document).ready(function ($) {
    //production forecast page:
    if (undefined != typeof ($('#forecastline')) && $('#forecastline').length) {
        DropdownMenuSupport("/Ajax/SupplierData", '#CompForeSelect');
        generateForecast();
    }
    //production charts page:
    if (undefined != typeof ($('#columnchart')) && $('#columnchart').length) {
        loadSupplierJson();
        $('.tablinks').on('click', function (evt) {
            showChart($(this).attr('data-content'));
            $(this).removeClass('active').addClass('active');
        });
    }
    $('#forecast-arima').on('click', function () {
        console.log("forecasting...");
        loadForecast();
        console.log("done forecasting.");
    });

    //test comparison page:   
    if (undefined != typeof ($('#TestChart')) && $('#TestChart').length) {
        DropdownMenuSupport("/Ajax/GetTestSample", '#testSelect');
        TestData();
    }

    //production comparison page:    
    if (undefined != typeof ($('#companySelect')) && $('#companySelect').length) {
        DropdownMenuSupport("/Ajax/SupplierData", '#companySelect'); // dropdown
        comparisoncharts(); //chart
    }

    //supplier map page:
    if (undefined != typeof ($('#map')) && $('#map').length) {
        generateSupplierButtonMap(); //show: (1) supplier map with togglable layer controls for supplier materials (polymer, glass, metal)
    }
});

//misc and availiable for multiple pages:

//dropdown functionality
function DropdownMenuSupport(url, name) {
    var promise = $.getJSON(url);
    promise.then(function (data) {
        data.forEach(function (e, i) {
            $(name).append('<option value="' + e.name + '">' + e.name + '</option>');
        });
    });
}
//general highchart charts
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
}
//highcharts with timeline
function generateStockChart(chartId, chartType, data) {
    // generate Highcharts chart
    return Highcharts.stockChart(chartId, {
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
}

//by page:

//production forecast page:
function generateForecast() {
    $.ajax({
        url: "/Ajax/SupplierData",
        type: "GET",
        async: false,
        dataType: "json",
        success: function (data) {
            console.log("success");
            console.log(data);
            $("#CompForeSelect").change(function () {
                var comp = $('#CompForeSelect').val();
                console.log(comp);
                data.forEach(function (e, i) {
                    if (String(comp) == String(e.name)) {
                        var company = e.data;
                        var series = [{
                            name: e.name,
                            data: company,
                            pointStart: Date.UTC(2015, 0, 1),
                            pointInterval: 7,
                            pointIntervalUnit: 'day'
                        }, {
                            name: "Forecast",
                            data: [87398, 99051.04664, 108373.9016, 115832.2064, 121798.8668, 126572.2084, 130390.8924, 133445.8481, 135889.8194, 137845.0019, 139409.1523
                            ],
                            pointStart: Date.UTC(2016, 10, 17),
                            pointInterval: 7,
                            pointIntervalUnit: 'day',
                            color: "#000000" //black
                        },
                        {
                            name: '80th Percentile',
                            data: [
                                [87398, 87398],
                                [94982.81843, 103119.2749],
                                [99997.56687, 116750.2364],
                                [102844.6119, 128819.8008],
                                [104110.6241, 139487.1094],
                                [104214.613, 148929.8039],
                                [103463.5555, 157318.2293],
                                [102085.9294, 164805.7667],
                                [100253.3216, 171526.3173],
                                [98095.21609, 177594.7878],
                                [95709.52128, 183108.7834]
                            ],
                            pointStart: Date.UTC(2016, 10, 17),
                            pointInterval: 7,
                            pointIntervalUnit: 'day',
                            type: 'arearange',
                            lineWidth: 0,
                            linkedTo: ':previous',
                            color: Highcharts.getOptions().colors[0],
                            fillOpacity: 0.3
                        }]
                        generateStockChart("forecastline", "line", series);
                    } //end of string comparison
                });
            });
        }
    })
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
//production charts page:
function loadSupplierJson() {
    // you could also pass parameters to the ajax function, for start and rows
    $.ajax({
        url: "/Ajax/SupplierData",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
            generateChart("linechart", "line", data);
            generateChart("columnchart", "column", data);
            DropdownMenuSupport("/Ajax/SupplierData", '#CompLineSelect');
            companyProductionLine();
        }
    });
}
function showChart(chartName) {
    $('.tabcontent').removeClass('hidden').addClass('hidden'); // hide all tabcontent elements
    $('.tablinks').removeClass('active'); // make all tablinks elements inactive
    $('#' + chartName).removeClass('hidden'); // show the chart
}
//production
function companyProductionLine() {
    $.ajax({
        url: "/Ajax/SupplierData",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
            $("#CompLineSelect").change(function () {
                var comp = $('#CompLineSelect').val();
                console.log(comp);
                data.forEach(function (e, i) {
                    if (String(comp) == String(e.name)) {
                        var series = [{
                            name: String(comp),
                            data: e.data,
                            pointStart: Date.UTC(2020, 0, 1),
                            pointInterval: 7,
                            pointIntervalUnit: 'day'
                        }];
                        generateStockChart("companyLine", "line", series);
                    }
                }) //end of data.foreach
            })

        }
    });
}
//test chart page:
function TestData() {
    $.ajax({
        url: "/Ajax/GetTestSample",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
            $("#testSelect").change(function () {
                var test = $("#testSelect").val();
                data.forEach(function (e, i) {
                    if (String(test) == String(e.name)) {
                        var series = [{
                            name: e.name,
                            data: e.data
                        }];
                        generateChart("TestChart", "line", series);
                    }
                }) //end of data.foreach
            });
        } //end of success:
    }); //end of ajax
}
//comparison chart
function comparisoncharts() {
    $.ajax({
        url: "/Ajax/SupplierData",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
            $("#CompRegSubmit").click(function () {
                var cdd = document.getElementById("companySelect");
                var comp = cdd.options[cdd.selectedIndex].value;
                var rdd = document.getElementById("regionSelect");
                var reg = rdd[rdd.selectedIndex].value;
                var multipler = Math.random(); //change the multuplier everytime region changes
                data.forEach(function (e, i) {
                    if (String(comp) == String(e.name)) {
                        var regionData = e.data.map(function (x) { return x * multipler });
                        var series = [{
                            name: (e.name + " CONUS"),
                            data: e.data
                        },
                        {
                            name: String(reg),
                            data: regionData
                        }];
                        generateChart("comparisonChart", "line", series);
                    }
                }) //end of data.foreach
            });
        } //end of success:
    }); //end of ajax
}
//supplier map page:
function generateSupplierButtonMap() {
    var map = L.map("map", { center: [40.63, -89.39] }); L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    var url = "/Ajax/GetCompanyLocu";
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
                    radius: 5, fillOpacity: 0.7, color: "black", fillColor: "black", weight: 1
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.company_Name).openPopup();
                });
            }
        });
        //split by material type:
        //polymer
        var polymer = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.material == "POLYMER";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, fillOpacity: 0.7, color: "black", fillColor: "#00B4D8", weight: 1
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.company_Name).openPopup();
                });
            }
        });
        //metal
        var metal = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.material == "METAL";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, fillOpacity: 0.7, color: "black", fillColor: "red", weight: 1
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.company_Name).openPopup();
                });
            }
        });
        //glass
        var glass = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.material == "GLASS";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, fillOpacity: 0.7, color: "black", fillColor: "blue", weight: 1
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.company_Name).openPopup();
                });
            }
        });

        var composite = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.material == "COMPOSITE";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, fillOpacity: 0.7, color: "black", fillColor: "green", weight: 1
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.company_Name).openPopup();
                });
            }
        });
        var sand = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.material == "SAND";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, fillOpacity: 0.7, color: "black", fillColor: "gray", weight: 1
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.company_Name).openPopup();
                });
            }
        });
        var wax = L.geoJson(gj, {
            filter: function (feature, layer) {
                return feature.properties.material == "WAX";
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, fillOpacity: 0.7, color: "black", fillColor: "yellow", weight: 1
                }).on("mouseover", function () {
                    this.bindPopup("Company Name: " + feature.properties.company_Name).openPopup();
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
        composite.addTo(map);
        wax.addTo(map);
        sand.addTo(map);
        //make the buttons toggleable
        $("#allSup").click(function () {
            map.removeLayer(allbusinesses);
            map.addLayer(glass);
            map.addLayer(metal);
            map.addLayer(polymer);
            map.addLayer(composite);
            map.addLayer(wax);
            map.addLayer(sand);
        });
        $("#BCer").click(function () {
            map.removeLayer(allbusinesses);
            map.addLayer(glass);
            map.removeLayer(metal);
            map.removeLayer(polymer);
            map.removeLayer(wax);
            map.removeLayer(sand);
            map.removeLayer(composite);
        });
        $("#BMet").click(function () {
            map.removeLayer(allbusinesses);
            map.removeLayer(glass);
            map.addLayer(metal);
            map.removeLayer(polymer);
            map.removeLayer(wax);
            map.removeLayer(sand);
            map.removeLayer(composite);
        });
        $("#BPol").click(function () {
            map.removeLayer(allbusinesses);
            map.removeLayer(glass);
            map.removeLayer(metal);
            map.addLayer(polymer);
            map.removeLayer(wax);
            map.removeLayer(sand);
            map.removeLayer(composite);
        });
        $("#BComp").click(function () {
            map.removeLayer(allbusinesses);
            map.removeLayer(glass);
            map.removeLayer(metal);
            map.removeLayer(polymer);
            map.removeLayer(wax);
            map.removeLayer(sand);
            map.addLayer(composite);
        });
        $("#BSan").click(function () {
            map.removeLayer(allbusinesses);
            map.removeLayer(glass);
            map.removeLayer(metal);
            map.removeLayer(polymer);
            map.removeLayer(wax);
            map.addLayer(sand);
            map.removeLayer(composite);
        });
        $("#BWax").click(function () {
            map.removeLayer(allbusinesses);
            map.removeLayer(glass);
            map.removeLayer(metal);
            map.removeLayer(polymer);
            map.addLayer(wax);
            map.removeLayer(sand);
            map.removeLayer(composite);
        });

    });
}