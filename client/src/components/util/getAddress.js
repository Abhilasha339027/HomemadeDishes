import { keys } from "../../keys";

const loadGoogleMaps = (callback) => {
  const existingScript = document.getElementById("googlePlacesScript");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.GOOGLE_API}&libraries=places`;
    script.id = "googleMaps";
    document.body.appendChild(script);
    //action to do after a script is loaded in our case setState
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

export function initMap(element, placeId, callback) {
  function checkMaps() {
    if (!window.google) {
      window.setTimeout(checkMaps, 200);
    } else {
      const map = new window.google.maps.Map(document.getElementById(element), {
        center: { lat: 40.6976701, lng: -74.2598737 },
        zoom: 15,
      });

      const geocoder = new window.google.maps.Geocoder();

      const infowindow = new window.google.maps.InfoWindow();

      geocoder.geocode({ placeId }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            callback(results[0]);
            const marker = new window.google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });
    }
  }
  checkMaps();
}
