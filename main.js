// Map Area:

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











