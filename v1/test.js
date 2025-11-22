 
var map = L.map('map').setView([37.254277, 9.875443], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
 
L.marker([37.254277, 9.875443]).addTo(map)
    .bindPopup('This me online users1')
    .openPopup();
 
L.marker([37.254368, 9.875181]).addTo(map)
    .bindPopup('This me online users2')
    .openPopup();


var popup = L.popup();

function onMapClick(e) {
  
          popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}




var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: './leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});
var greenIcon = new LeafIcon({iconUrl: 'leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: 'leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: 'leaf-orange.png'});
    usericon = new LeafIcon({iconUrl: 'personHi.png'});


L.marker([37.254556, 9.875782], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");  
L.marker([37.254099, 9.875304], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
L.marker([37.253902, 9.875696], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");
 
map.on('click', onMapClick);
 

 

 
