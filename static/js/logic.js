var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var defaultlayer=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});
// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark,
  defaultlayer : defaultlayer


};


var earthquake_plates=new L.LayerGroup()
// Overlays that may be toggled on or off
var overlayMaps = {
Earthquakes: earthquake_plates
};


var myMap=L.map("map", {
    center:[34.05, -118.24],
    zoom: 2,
    layers: [light,dark,defaultlayer]

});

defaultlayer.addTo(myMap)
L.control.layers(baseMaps,overlayMaps).addTo(myMap)


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


    d3.json(url, function(data) {
        
        console.log(data.features)
        function style_circle(feature){
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: colorcircles(feature.geometry.coordinates[2]),
                radius: circle_radius(feature.properties.mag),
                weight: 0
                }
            }


        function colorcircles(depth){
        switch(true){
            case depth > 90:
                return "red"
            case depth > 70:
                return "orange"
            case depth > 50:
                return "#f8c471"
            case depth >30:
                return "yellow"
            case depth > 10:
                return "#abebc6"
            default:
                return "#2ecc71"
        }
        
        }

        function circle_radius(magnitude){
            return magnitude * 2 ;
        }


        L.geoJson(data,{
            pointToLayer: function(feature, coord){
                return L.circleMarker(coord)
            },
            style: style_circle, 
            onEachFeature: function (feature, layer){
                layer.bindPopup("Magnitude: " + feature.properties.mag);
            }
        }
            ).addTo(earthquake_plates);
            earthquake_plates.addTo(myMap)

    var legend = L.control({ 
        position: "bottomright" 
    });
       
    
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var colors = ["2ecc71", "abebc6","yellow","f8c471","orange","red"];
        var grades = [0, 1, 2, 3, 4, 5];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
              "<i style='background: " + colors[i] + "'></i> " +
              grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
        }
        legend.addTo(myMap);
      });
      

      
    //   var firstlayer = L.layerGroup(circleMarker);

// Define variables for our tile layers

// Create map object and set default layers

// Pass our map layers into our layer control
// Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps).addTo(myMap);

      
// d3.json(url, function(response) {
    
//     console.log(response.features)
  
//     // Create a new marker cluster group
//     var markers = L.markerClusterGroup();
  
//     // Loop through data
//     for (var i = 0; i < response.length; i++) {
  
//       // Set the data location property to a variable
//       var location = response[i].place;
  
//       // Check for location property
//       if (location) {
  
//         // Add a new marker to the cluster group and bind a pop-up
//         markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//           .bindPopup(response[i].descriptor));
//       }
  
//     }
  
//     // // Add our marker cluster layer to the map
//     // myMap.addLayer(markers);
  
//   });
  


// d3.json(url, function(data){
//    var data=(data.features);
//    console.log(data)

// var markers = L.markerClusterGroup();

//   // Loop through data
//   for (var i = 0; i < response.length; i++) {

//     // Set the data location property to a variable
//     var location = response[i].location;

//     // Check for location property
//     if (location) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(response[i].descriptor));
//     }

//   }
//   myMap.addLayer(markers);
// });


//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }



