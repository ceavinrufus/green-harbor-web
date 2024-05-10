"use client";

import React, { useState, useEffect, useRef } from "react";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import { elements } from "chart.js";

const MAX_ZOOM = 17;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const OBJECT_ID = process.env.NEXT_PUBLIC_OBJECT_ID;
const FENCE_ID = process.env.NEXT_PUBLIC_FENCE_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;

function App() {
  const mapElement = useRef();

  const [mapLongitude, setMapLongitude] = useState(107.60834833180803);
  const [mapLatitude, setMapLatitude] = useState(-6.89391291797378);
  const [mapZoom, setMapZoom] = useState(16);
  const [map, setMap] = useState({});
  const [fences, setFences] = useState([]);

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  const displayFence = async (map, fences) => {
    for (const fence of fences) {
      await fetch(
        `https://api.tomtom.com/geofencing/1/fences/${fence.id}?key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const circleCenter = data.geometry.coordinates;
          const circleRadius = data.geometry.radius;

          map.addLayer({
            id: `fence-circle-${fence.id}`,
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: circleCenter,
                },
              },
            },
            paint: {
              "circle-radius": circleRadius,
              "circle-color": "blue",
              "circle-opacity": 0.1,
              "circle-stroke-color": "blue",
              "circle-stroke-width": 2,
            },
          });

          const border = document.createElement("div");
          border.className = `bg-[#ff0000] rounded-full size-4`;

          const marker = new tt.Marker({
            element: border,
            anchor: "center",
          })
            .setLngLat(circleCenter)
            .addTo(map);
        });
    }
  };

  const createMarker = (position, map) => {
    const markerElement = document.createElement("div");
    markerElement.className = "marker";

    const marker = new tt.Marker({ element: markerElement, anchor: "center" })
      .setLngLat(position)
      .addTo(map);

    return marker;
  };

  const fetchFences = async (map) => {
    await fetch(
      `https://api.tomtom.com/geofencing/1/projects/${PROJECT_ID}/fences?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        displayFence(map, data.fences);
      });
  };

  useEffect(() => {
    let map = tt.map({
      key: API_KEY,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    map.on("load", () => {
      fetchFences(map);
      setMap(map);
    });
    map.on("click", (e) => {
      let markerElement = document.querySelector(".marker");

      if (markerElement) {
        markerElement.remove();
      }
      createMarker(e.lngLat, map);

      sendPosition(e.lngLat);
    });

    return () => {
      map.remove();
    };
  }, []);

  const sendPosition = async (coordinates) => {
    const lastCoordinates = coordinates;

    var position = {
      type: "Feature",
      object: OBJECT_ID,
      geometry: {
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat, 0],
      },
    };
    await fetch(
      `https://api.tomtom.com/locationHistory/1/history/positions?key=${API_KEY}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(position),
      }
    ).then((res) => console.log(res));
  };

  return (
    <div className="w-full flex">
      <div className="w-full h-full">
        <div ref={mapElement} className="w-full h-screen" />
      </div>
    </div>
  );
}

export default App;
