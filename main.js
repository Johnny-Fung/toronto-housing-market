// Map Portion


// Instantiation of map object given instance of HTML element
var map = L.map('map').setView([37.8, -96], 4);

// Load map area
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamF3bmVlIiwiYSI6ImNrNDhlbnljdDBpN2QzZnJuN2Fsbm5wb2QifQ.4WF63m5Pova17L7cFr9ZNg',
{   maxZoom: 13,
    id: 'mapbox/light-v9'
}).addTo(map);
// Display the layers on map area from dataset values
L.geoJson(statesData).addTo(map);

// Function to assign colour based on data density
function getColor(density) {
    return density > 1000 ? '#ffffb2' :
           density > 500  ? '#ffeda0' :
           density > 200  ? '#fed976' :
           density > 100  ? '#feb24c' :
           density > 50   ? '#fd8d3c' :
           density > 20   ? '#fc4e2a' :
           density > 10   ? '#e31a1c' :
                            '#b10026';
}

// Styling function that assigns colour to the GEOJson layer based on the property.density
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4
    };
}
// Display the updated layers on map area from dataset values
L.geoJson(statesData, {style: style}).addTo(map);

// Define geojson variable so layers can be assigned to it later
var geojson;

// Define event listeners:
// - to allow for interactions on map
// - use event listeners to access layer using e.target

// - Hover: Highlight the area when mouse hovers over layer

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2.5,
        color: '#3984f7',
        dashArray: '',
        fillOpacity: 0.6
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    // Update textbox popup
    info.update(layer.feature.properties);
}
// Hover Off: Reset layer to default state again once mouse is off
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    // Update textbox popup
    info.update();
}

// Click: Zoom into the area
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// Add event listeners to map layers
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
// Display the updated layers on map area from dataset values
geojson = L.geoJson(statesData, 
{
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// Add popups on hover to show more information about area
var info = L.control();

// Create textbox popup ontop of map
info.onAdd = function (map) {
    // create a div with a class "info"
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
};

// Update the textbox popup with values on hover
info.update = function (props) {
    this._div.innerHTML = '<h4>Average Housing Price</h4>' +  (props ?
        '<strong>' + props.name + '</strong><br />' +'$'+ props.density + ' CAD'
        : 'Hover over a region');
};
// Display the textbox on map area from dataset values
info.addTo(map);

// Set legend location on map
var legend = L.control({position: 'bottomright'});

// Create a popup for the map legend with values
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through the color density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
// Display the legend on map area
legend.addTo(map);



// Chart Area:

var ctx = document.getElementById('graph').getContext('2d');
function renderChart(data, labels) {
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
};

