import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Fragment } from "react";

function MapBox({ locations }) {
  return (
    <Map
      mapLib={import("mapbox-gl")}
      mapboxAccessToken="pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A"
      style={{
        width: "100%",
        height: 400,
        transitionDuration: 200,
        borderRadius: 10,
        border: "1px solid #ccc",
      }}
      initialViewState={{
        longitude: `${locations[0].coordinates[1]}`,
        latitude: `${locations[0].coordinates[0]}`,
        zoom: 6,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {locations.map((location, index) => (
        <Fragment key={index}>
          <Marker
            latitude={location.coordinates[0]}
            longitude={location.coordinates[1]}
            anchor="bottom"
          ></Marker>
          <Popup
            latitude={location.coordinates[0]}
            longitude={location.coordinates[1]}
            closeButton={true}
            closeOnClick={false}
            offset={50}
            style={{ borderRadius: 10 }}
          >
            <span>
              Ngày {location.day}: {location.description}
            </span>
          </Popup>
        </Fragment>
      ))}
    </Map>
  );
}

export default MapBox;
