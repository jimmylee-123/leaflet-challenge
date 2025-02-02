// Code generated from OpenAI's ChatGPT
// Begin code:
// Create the map
let map = L.map('map', {
  center: [37.33639472440057, -121.90150034400018],
  zoom: 7,
});

// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      radius: getRadius(feature.properties.mag),  // Use magnitude for the radius
      fillColor: getColor(feature.geometry.coordinates[2]),  // Use depth for the color
      color: "#000000",  // Outline color of the circle
      weight: 0.5,  // Line thickness
      opacity: 0.7,  // Transparency of the circle's border
      fillOpacity: 0.7  // Transparency of the circle's fill
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth < 70) return "#00FF00"; // Shallow (green)
    else if (depth < 300) return "#FFFF00"; // Medium (yellow)
    else return "#FF0000"; // Deep (red)
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    return magnitude * 4;  // Scale the radius by a factor (you can tweak this for visibility)
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3><hr><p>Location: " + feature.properties.place + "</p>");
    }
  }).addTo(map);
});
// End code