"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Organization } from "@/lib/types";
import { createPortal } from "react-dom";
import { CustomPopup } from "./MapPopup";

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
  selectedOrg: Organization | null;
  setSelectedOrg: (org: Organization) => void;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

const MapComponent: React.FC<MapProps> = ({
  organizations,
  flyToTrigger,
  selectedOrg,
  setSelectedOrg,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const popupsRef = useRef<{ [key: number]: mapboxgl.Popup }>({});
  const popupNodesRef = useRef<{ [key: number]: HTMLDivElement }>({});

  // Add custom styles to the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customPopupStyle;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

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

    mapRef.current = map;

    // Create popups for organizations
    organizations.forEach((org) => {
      // Create a DOM node for the popup content
      const popupNode = document.createElement("div");
      popupNodesRef.current[org.id] = popupNode;

      const popup = new mapboxgl.Popup({
        anchor: "top-left",
        closeButton: false,
        closeOnClick: true,
      }).setDOMContent(popupNode);

      const marker = new mapboxgl.Marker({ color: "#FF6400" })
        .setLngLat([org.longitude, org.latitude])
        .setPopup(popup)
        .addTo(map);

      // Add click event listener to the marker to set the selected organization
      marker.getElement().addEventListener("click", () => {
        setSelectedOrg(org); // Make sure setSelectedOrg is correctly updating the state
      });

      markersRef.current[org.id] = marker;
      popupsRef.current[org.id] = popup;
    });

    const markers = markersRef.current;
    const popups = popupsRef.current;

    return () => {
      Object.values(markers).forEach((marker) => marker.remove());
      Object.values(popups).forEach((popup) => popup.remove());
      map.remove();
    };
  }, [organizations, setSelectedOrg]);

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
  }, [selectedOrg]);

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
