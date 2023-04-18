var myMap = L.map("map", {
    center: [30, -5.574290],
    zoom: 2
});

var basemap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'", {
    attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
});

var themap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

basemap.addTo(myMap)

// // Include dropdown menu
// var baseMaps = {
//     "Global Earthquakes": basemap,
//     "Global Blue": themap,
// };
// var tectonicplates = new L.LayerGroup();
// var earthquakes = new L.LayerGroup();

// var overlays = {
//     "Tectonic Plates": tectonicplates,
//     "Earthquakes": earthquakes
// };

// L.control.layers(baseMaps, overlays).addTo(myMap);

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function (data) {
    console.log(data.features[100]);
 
        function styleInfo(feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000000",
                radius: getRadius(feature.properties.mag),
                stroke: true,
                weight: 0.5
            };
        }
    function getColor(depth) {
        switch (true) {
            case depth > 90:
                return '#F06A6A'
            case depth > 70:
                return '#F0A76A'
                case depth > 50:
                    return '#F3B94C'
                    case depth > 30:
                        return '#F3DB4C'
                        case depth > 10:
                            return '#E1F34C'
            case depth < 11:
                return '#B6F34C'
        }
    }
    //'#F06A6A', '#F0A76A', '#F3B94C', '#F3DB4C', '#E1F34C', '#B6F34C' starting from 90

    //'#B6F34C', '#E1F34C', '#F3DB4C', '#F3B94C', '#F0A76A','#F06A6A' starting from 0
    
    function getRadius (mag){
        if (mag == 0){
            return 1;
        }
        return mag * 4;
    }

    L.geoJson(data,{
        pointToLayer: function(feature,coords){
            return L.circleMarker(coords)
        },
        style:styleInfo,
        onEachFeature: function (feature, layer){
            layer.bindPopup(feature.properties.place + '<br>Magnitude: ' + feature.properties.mag)
        }
    }).addTo(myMap);
});
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<i style="background:#F06A6A">>90</i><br>';
    div.innerHTML += '<i style="background: #F0A76A">>70</i><br>';
    div.innerHTML += '<i style="background: #F3B94C">>50</i><br>';
    div.innerHTML += '<i style="background: #F3DB4C">>30</i><br>';
    div.innerHTML += '<i style="background: #E1F34C">>10</i><br>';
    div.innerHTML += '<i style="background: #B6F34C"><10</i><br>';
    return div;
};
legend.addTo(myMap);