import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ location }) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBV2OA_Lbs3c5dj2IZeE1GuKc9KIgoF7vw",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}

      <Marker position={{ lat: location.lat, lng: location.lng }} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
