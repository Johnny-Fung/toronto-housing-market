// Map Area:

// Instantiation of map object given instance of HTML element
var map = L.map('map').setView([43.72, -79.4], 10.5);

// Load map area
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamF3bmVlIiwiYSI6ImNrNDhlbnljdDBpN2QzZnJuN2Fsbm5wb2QifQ.4WF63m5Pova17L7cFr9ZNg',
{   maxZoom: 13,
    id: 'mapbox/light-v9'
}).addTo(map);

var geojson;

// Display the layers on map area from dataset values
L.geoJson(DistrictData).addTo(map);














