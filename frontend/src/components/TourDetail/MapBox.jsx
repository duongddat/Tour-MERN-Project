import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapBox({ locations }) {
  return (
    <Map
      mapLib={import("mapbox-gl")}
      mapboxAccessToken="pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A"
      initialViewState={{
        longitude: locations[0].coordinates[1],
        latitude: locations[0].coordinates[0],
        zoom: 1000,
      }}
      style={{
        width: "100%",
        height: 500,
        transitionDuration: 200,
        borderRadius: 10,
      }}
      zoom={1}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          latitude={location.coordinates[0]}
          longitude={location.coordinates[1]}
          anchor="bottom"
        ></Marker>
      ))}
    </Map>
  );
}

export default MapBox;
