// ~~~~~ Map Area ~~~~~:

// Instantiation of map object given instance of HTML element
var map = L.map('map').setView([43.72, -79.355], 10.5);

// Load map area
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamF3bmVlIiwiYSI6ImNrNDhlbnljdDBpN2QzZnJuN2Fsbm5wb2QifQ.4WF63m5Pova17L7cFr9ZNg',
{   maxZoom: 17,
    id: 'mapbox/outdoors-v11',
    attribution: '<strong><a href="https://github.com/Johnny-Fung/toronto-condo-market">View source on Github</a></strong>'
}).addTo(map);

// Display the layers on map area from dataset values
L.geoJson(DistrictData).addTo(map);

// Add Density colors:
// Function to assign colour based on data density
function getColor(avgprice) {
    return avgprice > 1100000 ? '#d73027' :
           avgprice > 1000000 ? '#f46d43' :
           avgprice > 900000 ? '#fdae61' :
           avgprice > 800000 ? '#fee08b' :
           avgprice > 700000 ? '#ffffbf' :
           avgprice > 600000 ? '#d9ef8b' :
           avgprice > 500000 ? '#a6d96a' :
           avgprice > 400000 ? '#66bd63' :
                                '#1a9850';
}

// Styling function that assigns colour to the GEOJson layer based on the property.density
function style(feature) {
    var price_as_int = parseFloat(feature.properties.PARENT_AREA_ID.replace(/,/g, ''));
    return {
        fillColor: getColor(price_as_int),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.37
    };
}
// Display the updated layers on map area from dataset values
L.geoJson(DistrictData, {style: style}).addTo(map);

// Define geojson variable so layers can be assigned to it later
var geojson;

// Add popups on hover to show more information about area
var info = L.control();

// Create textbox popup ontop of map
info.onAdd = function (map) {
    // create a div with a class "info"
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
};

// AREA_ID = Area name
// AREA_ATTRID = District
// PARENT_AREA_ID = Average Price
// AREA_SHORT_CODE = Median Price
// AREA_LONG_CODE = Average Days On Market

// AREA_NAME = 2011 Avg Price
// AREA_DESC = 2012 Avg Price
// X = 2013 Avg Price
// Y = 2014 Avg Price
// LONGITUDE = 2015 Avg Price
// LATITUDE = 2016 Avg Price
// OBJECTID = 2017 Avg Price
// Shape__Area = 2018 Avg Price
// Shape__Length = 2019 Avg Price
// AREA_ATTRID = 2020 Avg Price(FUTURE ADDITION)

// Update the textbox popup with values on hover
info.update = function (property) {
    this._div.innerHTML = '<h4>Toronto Condo Pricing</h4>' +  (property ?
        '<strong>' + property.AREA_ID + '</strong><br />' +'Average Price: $'+ property.PARENT_AREA_ID + ' CAD' 
        + '</strong><br />' +'Median Price: $'+ property.AREA_SHORT_CODE + ' CAD'
        + '</strong><br />' +'Average Days on Market: '+ property.AREA_LONG_CODE
        : 'Hover over a region <br />*Data as of Q3 2019');
};
// Display the textbox on map area from dataset values
info.addTo(map);

// Set legend location on map
var legend = L.control({position: 'bottomright'});

// Create a popup for the map legend with values
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades_num = [300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000],
        grades = ["$300K", "$400K", "$500K", "$600K", "$700K", "$800K", "$900K", "$1M", "$1.1M"],
        labels = [];
    div.innerHTML += '<strong>Average Sale Price</strong><br />'
    // loop through the color density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades_num[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
// Display the legend on map area
legend.addTo(map);

// Add reset zoom button
function resetZoom() {
    map.fitBounds(geojson.getBounds());
}



// ~~~~~ Chart Area ~~~~~:

// Data for City of Toronto Average (second dataset to be modified)
var cityAverage = [
    {x: 2011, y: 316306},
    {x: 2012, y: 333896},
    {x: 2013, y: 331658},
    {x: 2014, y: 357005},
    {x: 2015, y: 374920},
    {x: 2016, y: 407034},
    {x: 2017, y: 496523},
    {x: 2018, y: 539981},
    {x: 2019, y: 587288}
];
var toModifycityAverage = [
    {x: 2011, y: 316306},
    {x: 2012, y: 333896},
    {x: 2013, y: 331658},
    {x: 2014, y: 357005},
    {x: 2015, y: 374920},
    {x: 2016, y: 407034},
    {x: 2017, y: 496523},
    {x: 2018, y: 539981},
    {x: 2019, y: 587288}
];

// Chart Options
var options = {
    type: 'line',
    data: {
        labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        datasets: [{
            label: 'City of Toronto Average',
            data: cityAverage,
            backgroundColor: 
                'rgba(255, 0, 0, 1)',
            borderColor:
                'rgba(255, 0, 0, 1)',
            fill: false
        },
        // Purposely draw two CityAverage datasets ontop of each other, and modify second dataset instead of having to add dataset
        {
            label: 'Click an Area on Map to Compare',
            data: toModifycityAverage,
            backgroundColor: 
                'rgba(44, 130, 201, 1)',
            borderColor:
                'rgba(44, 130, 201, 1)',
            fill: false
        }]
    },
    options: {
        responsive: false,
        title: {
            display: true,
            text: 'Compared to the Trend of the Entire City',
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
					mode: 'nearest',
					intersect: true
				},
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true, 
                    labelString: 'Average Price in Q3'
                },
                ticks: {
                    type: 'linear',
                }
            }]
        }
    }
}

var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, options);


// ~~~~~ Define event listeners ~~~~~:
// - to allow for interactions on map and chart
// - use event listeners to access layer using e.target


// Update Chart based on Click event listener
function selectData(e) {
    // Click to Zoom into the map area
    map.fitBounds(e.target.getBounds());
    
    // Select dataset to display based on clicked area
    var data = e.target;

    //Of the two CityAverage datasets, update second one
    chart.data.datasets[1].label = data.feature.properties["AREA_ID"];
    chart.data.datasets[1].data[0] = data.feature.properties["AREA_NAME"];
    chart.data.datasets[1].data[1] = data.feature.properties["AREA_DESC"];
    chart.data.datasets[1].data[2] = data.feature.properties["X"];
    chart.data.datasets[1].data[3] = data.feature.properties["Y"];
    chart.data.datasets[1].data[4] = data.feature.properties["LONGITUDE"];
    chart.data.datasets[1].data[5] = data.feature.properties["LATITUDE"];
    chart.data.datasets[1].data[6] = data.feature.properties["OBJECTID"];
    chart.data.datasets[1].data[7] = data.feature.properties["Shape__Area"];
    chart.data.datasets[1].data[8] = data.feature.properties["Shape__Length"];
    chart.update();
}

// - Hover: Highlight the map area when mouse hovers over layer
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2.5,
        color: '#3984F7',
        dashArray: '',
        fillOpacity: 0.6
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    // Update textbox popup
    info.update(layer.feature.properties);
}

// Hover Off: Reset map layer to default state again once mouse is off
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    // Update textbox popup
    info.update();
}

// Add event listeners to map layers and chart
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: selectData
    });
}
// Display the updated layers on map area from dataset values
geojson = L.geoJson(DistrictData, 
{
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);