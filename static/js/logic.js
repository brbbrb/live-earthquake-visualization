// define geoJSON url
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create layerGroup for earthqakes
var earthquakes = L.layerGroup();

// Perform a GET request to the query URL/
d3.json(earthquakeURL).then(function(data){
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
});

function getColor(depth) {
    switch (true) {
        case depth >= 90:
            return "#a70000";
        case depth >= 70:
            return "#be4608";
        case depth >= 50:
            return "#cf721c";
        case depth >= 30:
            return "#da9d39";
        case depth >= 10:
            return "#d6ca62";
        default:
            return "#72de8f";
    }
};

function getSize(mag) {
    return mag * 4;
};

// style info


function createFeatures(earthquakeData) {

    function markerFeatures(feature){
        return {
        radius: getSize(feature.properties.mag),
        fillOpacity: 0.7,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "white",
        weight: .7
        };
    }

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes features of the earthquake
    function onEachFeature(feature, layer) {
        // add popup to each point on map
        layer.bindPopup(`<h2>${feature.properties.mag} Magnitude Earthquake</h2><hr><p><b>Time:</b> ${new Date(feature.properties.time)}</p><p><b>Location:</b> ${feature.properties.place}</p><p><b>Coordinates:</b> ${feature.geometry.coordinates[1]}, ${feature.geometry.coordinates[0]}</p><p><b>Depth:</b> ${feature.geometry.coordinates[2]} km</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        onEachFeature: onEachFeature,
        style: markerFeatures
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
};


function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        5.55, -30.42
      ],
      zoom: 3,
      layers: [street, earthquakes]
    });

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // Create legend
    var legend = L.control({ position: "bottomright" });

    // add variables to legend in html
    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Earthquake <br>Depth (km)</h4>";
      div.innerHTML += '<li style="background: #72de8f"></li><span>  0-10</span><br>';
      div.innerHTML += '<li style="background: #d6ca62"></li><span>  10-30</span><br>';
      div.innerHTML += '<li style="background: #da9d39"></li><span>  30-50</span><br>';
      div.innerHTML += '<li style="background: #cf721c"></li><span>  50-70</span><br>';
      div.innerHTML += '<li style="background: #be4608"></li><span>  70-90</span><br>';
      div.innerHTML += '<li style="background: #a70000"></li><span>  90+</span><br>';      
      return div;
    };

    // add legend to map
    legend.addTo(myMap);

}