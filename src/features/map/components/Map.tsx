"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Coordinate, Organization } from "@/lib/types";
import { createPortal } from "react-dom";
import { CustomPopup } from "./MapPopup";
import { createRoot } from "react-dom/client";

// Add custom CSS to override Mapbox popup styles
const customPopupStyle = `
.mapboxgl-popup-content {
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  border: 1px solid #e2e8f0;
}

.mapboxgl-popup-close-button {
  padding: 0;
  width: 24px;
  height: 24px;
  color: #4a5568;
  font-size: 16px;
  right: 6px;
  top: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.mapboxgl-popup-close-button:hover {
  background-color: #f7fafc;
  color: #2d3748;
}

.mapboxgl-popup-tip {
  border-top-color: #e2e8f0 !important;
}
`;

interface MapProps {
  organizations: Organization[];
  flyToTrigger: number; // Add this prop to force fly animation
  flyToUserTrigger: number;
  selectedOrg: Organization | null;
  handleCardClick: (org: Organization) => void;
  userLocation?: Coordinate;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

const MapComponent: React.FC<MapProps> = ({
  organizations,
  flyToTrigger,
  flyToUserTrigger,
  selectedOrg,
  handleCardClick,
  userLocation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const popupsRef = useRef<{ [key: number]: mapboxgl.Popup }>({});
  const popupNodesRef = useRef<{ [key: number]: HTMLDivElement }>({});
  const userLocationMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [mapCenter, setMapCenter] = useState<Coordinate>({
    latitude: 13.755805624081402,
    longitude: 100.49938254635164,
  });

  // Add custom styles to the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customPopupStyle;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Update map center when userLocation changes
  useEffect(() => {
    if (
      userLocation &&
      (userLocation.latitude !== mapCenter.latitude ||
        userLocation.longitude !== mapCenter.longitude)
    ) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  // Initialize the map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [mapCenter.longitude, mapCenter.latitude],
      zoom: 10,
    });

    mapRef.current = map;

    // Remove existing user location marker
    if (userLocationMarkerRef.current) {
      userLocationMarkerRef.current.remove();
    }

    // Add marker only if valid user location exists
    if (
      userLocation &&
      (userLocation.latitude !== 13.755805624081402 ||
        userLocation.longitude !== 100.49938254635164)
    ) {
      // Create a div element to hold your React component
      const el = document.createElement("div");

      // Use ReactDOM to render your custom marker into the div
      createRoot(el).render(<UserMarker />);

      const userLocationMarker = new mapboxgl.Marker({
        element: el,
      })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(mapRef.current);

      userLocationMarkerRef.current = userLocationMarker;
    }

    // Create popups for organizations
    organizations.forEach((org) => {
      // Create a DOM node for the popup content
      const popupNode = document.createElement("div");
      popupNodesRef.current[org.id] = popupNode;

      const popup = new mapboxgl.Popup({
        anchor: "top",
        closeButton: false,
        closeOnClick: true,
      }).setDOMContent(popupNode);

      const marker = new mapboxgl.Marker({ color: "#FF6400" })
        .setLngLat([org.longitude, org.latitude])
        .setPopup(popup)
        .addTo(map);

      // Add click event listener to the marker to set the selected organization
      marker.getElement().addEventListener("click", () => {
        handleCardClick(org); // Make sure handleCardClick is correctly updating the state
      });

      markersRef.current[org.id] = marker;
      popupsRef.current[org.id] = popup;
    });

    const markers = markersRef.current;
    const popups = popupsRef.current;
    const userMarker = userLocationMarkerRef.current;

    return () => {
      Object.values(markers).forEach((marker) => marker.remove());
      Object.values(popups).forEach((popup) => popup.remove());
      if (userMarker) userMarker.remove();
      map.remove();
    };
  }, [organizations, handleCardClick, mapCenter, userLocation]);

  // Show popup for the selected organization
  useEffect(() => {
    if (selectedOrg && mapRef.current) {
      // Close all other popups
      Object.values(popupsRef.current).forEach((popup) => popup.remove());

      // Show popup for selected organization
      const marker = markersRef.current[selectedOrg.id];
      if (marker) {
        const popup = marker.getPopup();
        popup?.addTo(mapRef.current);
      }
    }
  }, [selectedOrg, flyToTrigger]);

  // Fly to the selected organization
  useEffect(() => {
    if (selectedOrg && mapRef.current) {
      const { latitude, longitude } = selectedOrg;
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        // essential: true,
        // duration: 1000,
      });
    }
  }, [selectedOrg, flyToTrigger]); // Re-run this effect when selectedCoordinates change

  // Fly to user location
  useEffect(() => {
    if (userLocation && mapRef.current) {
      const { latitude, longitude } = userLocation;
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        // essential: true,
        // duration: 1000,
      });
    }
  }, [userLocation, flyToUserTrigger]);

  return (
    <div className="relative h-[100vh] w-[100vw]">
      <div ref={mapContainerRef} className="w-full h-full" />
      {/* Render popups using portals */}
      {organizations.map((org) => {
        const popupNode = popupNodesRef.current[org.id];
        return popupNode
          ? createPortal(<CustomPopup organization={org} />, popupNode)
          : null;
      })}
    </div>
  );
};

export default MapComponent;

const UserMarker = () => {
  return (
    <div className="relative w-[20px] h-[20px] shadow-md shadow-blue-500 rounded-full">
      <div className="absolute inset-0 bg-blue-700/20 rounded-full animate-ping w-[30px] h-[30px] -top-[25%] -left-[25%]"></div>
      <div className="absolute inset-0 bg-[#0F53FE] drop-shadow-lg p-[2px] rounded-full flex justify-center items-center border-2 border-white"></div>
    </div>
  );
};
