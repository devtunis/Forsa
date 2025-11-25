 
 
window.addEventListener("DOMContentLoaded",()=>{

let tracknumberofMarker = 0;
let isValidToClick = true
const button = document.getElementById("cancle")

let  map = L.map('map').setView([37.254371, 9.875373], 18);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//L.marker([37.254371, 9.875373], dra)	




// map.pm.enableDraw("Line", {
 // snappable: true,
 // snapDistance: 20,
 // hintlineStyle:{ color: '#d42b11ff', dashArray: [5, 5] } ,
 // markerStyle :{ draggable: true },
 // cursorMarker:true,autoTracing:true

 //popup()
    //  L.popup()
    // .setLatLng(ev.latlng)
    // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    // .openOn(map);
  // clean popup 
    //let popup = L.popup(ev.latlng, {content: '<p>Hello world!<br />This is a nice popup.</p>'})
    // .openOn(map);
//});

let start =[]       
let end = []      
let trackMarkersStart ;
let trackMarker ;
let routeLayer ;
let removeStartMarker;
const  redIcon = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],       
    iconAnchor: [12, 41],       
    popupAnchor: [1, -34],      
    shadowSize: [41, 41]
});
let Destination = document.getElementById("Destination")
let goaheadcalculatethedistance = document.getElementById("goaheadcalculatethedistance")
let updateDestinaton  = document.getElementById("updateDestinaton");
let UpdateStartPoint  = document.getElementById("UpdateStartPoint");
let UsseCurrentLocation = document.getElementById("UserCurrentLocation");
 

UsseCurrentLocation.onclick = async () => {

      if(trackMarkersStart)  map.removeLayer(trackMarkersStart)
      if(routeLayer)  map.removeLayer(routeLayer)
      if(trackMarker)  map.removeLayer(trackMarker)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log("Latitude:", lat, "Longitude:", lng);
                start[0] = lat
                start[1] = lng
                 
               removeStartMarker =  L.marker([lat, lng], { icon:redIcon, pmIgnore: false }).addTo(map);
                map.flyTo([lat, lng], 18, {
                    animate: true,   
                    duration: 1.5  
                }); 
                 tracknumberofMarker=1
                
            },
            (error) => {
                console.error("Error getting location:", error.message);
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
};

 
 





Destination.onclick= ()=>{
 
   
   if(start.length==0){
      console.log("ya si zbi i5tar debut la nji niklek omek")
    return ;
   }
    tracknumberofMarker = 1
}
UpdateStartPoint.onclick= ()=>{
    tracknumberofMarker = 0
    if(trackMarkersStart) map.removeLayer(trackMarkersStart)
    if(routeLayer) map.removeLayer(routeLayer) // this is for remove the blue line betwen 2 point red and blue

}



  
goaheadcalculatethedistance.onclick =()=>{
    
   if(start.length>0 && end.length>0) {

    if(isValidToClick){
     isValidToClick = false
     tracknumberofMarker=10;
    console.log("Your Start is ",start,"and your end is ",end , isValidToClick) 

     fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`)
        .then(res => res.json())
        .then(data => {
            let route = data.routes[0].geometry;
            console.log(route,"here we go this fucking row")
           routeLayer =   L.geoJSON(route, {
                style: { color: "blue", weight: 5 }
            }).addTo(map);
        })


    setTimeout(() => {
       isValidToClick =true
    },1000);
    }
      }
       else{
        console.log("haw bch nji nikelk omelk wla le  ,??? 9oli ya zabour")
       }
 
  }

 

updateDestinaton.onclick = ()=>{
if(start.length>0 && end.length>0){
      tracknumberofMarker = 1
  if(routeLayer)map.removeLayer(routeLayer) 
  if(trackMarker) map.removeLayer(trackMarker)
}else{
    console.log("how yt9ou7b hedha")
}
}


map.on('click', function(ev) {
    
    if(tracknumberofMarker==0){
     if(trackMarkersStart) map.removeLayer(trackMarkersStart)
     trackMarkersStart =    L.marker([ev.latlng.lat, ev.latlng.lng], { icon:redIcon, pmIgnore: false }).addTo(map);
      
     start[0] =ev.latlng.lat
     start[1] = ev.latlng.lng
    }
    if(tracknumberofMarker==1){
     if(trackMarker) map.removeLayer(trackMarker)
     trackMarker =    L.marker([ev.latlng.lat, ev.latlng.lng], { pmIgnore: false }).addTo(map);
           //   L.popup()
           //  .setLatLng(ev.latlng)
           //  .setContent('<p>Hello world!<br />This is a nice popup.</p>')
           //  .openOn(map);
     end[0] =ev.latlng.lat
     end[1] = ev.latlng.lng
    }

   

    
});


map.on("pm:create", (e) => {
  console.log(e);
});



 

button.addEventListener("click",()=>{
    if(trackMarkersStart)  map.removeLayer(trackMarkersStart)
    if(routeLayer)  map.removeLayer(routeLayer)
    if(trackMarker)  map.removeLayer(trackMarker)
      if(removeStartMarker)      map.removeLayer(removeStartMarker)
      tracknumberofMarker = 0 ;
   //  map.pm.disableDraw();
     // map.pm.enableDraw("Line", {
   //snappable: true,
  // snapDistance: 20,
 
 //});
})
 



function geteachtimeLocationWithoutUsingSocketHahhaha  () {
    
let userMarker;

navigator.geolocation.watchPosition(
    (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("💨 موقع جديد:", lat, lng);

        if (!userMarker) {
            userMarker = L.marker([lat, lng]).addTo(map);
        } else {
            userMarker.setLatLng([lat, lng]);
        }

        map.flyTo([lat, lng], 18);
    },
    (err) => console.log(err),
    { enableHighAccuracy: true }
);



}
// add template to mosqué

})
// search about this 'can i do something like know if the user bounce the device or no ? '
// and can you infomrémé this app for a lto  of

// work with reall time thing like design many users 
 