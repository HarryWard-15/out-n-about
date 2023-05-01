import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import geoJSON from "./map-data/mandurah-foreshore-markers.json";

import "./../../style/map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FvaW1oZWp5b3RpIiwiYSI6ImNsaDM1OTdoNzFqdHczY3BudXd0d3M4enMifQ.862ifcHz_-veRJKGrWjwQw";

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.name);
  };
  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};

export default function MandurahMap() {
  const mapContainer = useRef(null);
  //   const map = useRef(null);
  const [lng, setLng] = useState(115.7187);
  const [lat, setLat] = useState(-32.533499);
  const [zoom, setZoom] = useState(13);
  const [projection, setProjection] = useState("globe");

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      projection: projection,
    });

    // Create default markers
    geoJSON.features.forEach((feature) =>{
        const ref = React.createRef();
        ref.current = document.createElement("div");

        ReactDOM.render(
            <Marker onClick={markerClicked} feature={feature} />,
            ref.current
        );

      new mapboxgl.Marker(ref.current).setLngLat(feature.geometry.coordinates).addTo(map);
  });

    return () => map.remove();
  }, []);

  const markerClicked = (title) => {
    window.alert(title);
  }

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}