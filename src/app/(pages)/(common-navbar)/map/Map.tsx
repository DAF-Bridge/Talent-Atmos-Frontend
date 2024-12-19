"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

interface Organization {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  organizations: Organization[];
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

const MapComponent: React.FC<MapProps> = ({ organizations }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [
        organizations[0]?.longitude || 0,
        organizations[0]?.latitude || 0,
      ],
      zoom: 10,
    });

    organizations.forEach((org) => {
      new mapboxgl.Marker({color:"#FF6400"})
        .setLngLat([org.longitude, org.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${org.name}</h3>`)) // Optional popup
        .addTo(map);
    });

    return () => map.remove(); // Cleanup on unmount
  }, [organizations]);

  return (
    <div className="relative h-[100vh] w-[100vw] ">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default MapComponent;
