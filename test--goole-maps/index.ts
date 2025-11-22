/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (data) => {
                resolve([data.coords.latitude, data.coords.longitude]);
            },
            (err) => reject(err)
        );
    });
}
 
 


async function initMap():   Promise<void>{
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
   const data :any = await getLocation();
   console.log(data)
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 7,
      center: { lat: 37.2746, lng: 9.8739},
      // can i add marker here or something tell me where i exact ?  i think their thing in this object make it true to work?
    }
  );

  directionsRenderer.setMap(map);

  
  const marker = new google.maps.Marker({
    position:  { lat: 37.2746, lng: 9.8739},
    map: map,
    title: "You are here!",
  })

    const otherPeople = [
    { lat:37.2746 + 0.01, lng: 9.8739 + 0.01, name: "Alice" },
    { lat:37.2746 - 0.02, lng: 9.8739 + 0.02, name: "Bob" },
    { lat:37.2746 + 0.03, lng: 9.8739 - 0.01, name: "Charlie" },
  ];

  otherPeople.forEach((person) => {
    new google.maps.Marker({
      position: { lat: person.lat, lng: person.lng },
      map: map,
      title: person.name,
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });
  });




  const onChangeHandler = function () {
    console.log("i get here")
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  (document.getElementById("start") as HTMLElement).addEventListener(
    "change",
    onChangeHandler
  );
  (document.getElementById("end") as HTMLElement).addEventListener(
    "change",
    onChangeHandler
  );
}

function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer
) {
  directionsService
    .route({
      origin: {
        query: (document.getElementById("start") as HTMLInputElement).value,
      },
      destination: {
        query: (document.getElementById("end") as HTMLInputElement).value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
