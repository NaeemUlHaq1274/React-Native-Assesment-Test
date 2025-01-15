// src/utils/markerHandlers.ts

import { MarkerData } from "../types";
import { formatCoordinate } from "./formatCoordinate";

export const handleMarkerDrag = (
  index: number,
  coordinate: { latitude: number; longitude: number },
  markers: (MarkerData | null)[],
  setMarkers: React.Dispatch<React.SetStateAction<(MarkerData | null)[]>>,
  selectedMarkerIndex: number,
  setInputLat: React.Dispatch<React.SetStateAction<string>>,
  setInputLng: React.Dispatch<React.SetStateAction<string>>
) => {
  const formattedCoordinate = {
    latitude: formatCoordinate(coordinate.latitude),
    longitude: formatCoordinate(coordinate.longitude),
  };

  setMarkers((prev) => {
    const updatedMarkers = [...prev];
    if (updatedMarkers[index]) {
      updatedMarkers[index] = {
        ...formattedCoordinate,
        name: updatedMarkers[index]!.name,
      };
    }
    return updatedMarkers;
  });

  // Update input fields if this is the selected marker
  if (index === selectedMarkerIndex) {
    setInputLat(formattedCoordinate.latitude.toString());
    setInputLng(formattedCoordinate.longitude.toString());
  }
};

export const handleMapPress = (
  coordinate: { latitude: number; longitude: number },
  selectedMarkerIndex: number,
  markers: (MarkerData | null)[],
  setMarkers: React.Dispatch<React.SetStateAction<(MarkerData | null)[]>>,
  setInputLat: React.Dispatch<React.SetStateAction<string>>,
  setInputLng: React.Dispatch<React.SetStateAction<string>>
) => {

  const formattedCoordinate = {
    latitude: formatCoordinate(coordinate.latitude),
    longitude: formatCoordinate(coordinate.longitude),
  };
  console.log({formattedCoordinate})

  setMarkers((prev) => {
    const updatedMarkers = [...prev];
    if (selectedMarkerIndex === 0 || selectedMarkerIndex === 1) {
      updatedMarkers[selectedMarkerIndex] = {
        ...formattedCoordinate,
        name:
          prev[selectedMarkerIndex]?.name ||
          `Marker ${selectedMarkerIndex + 1}`,
      };
    }
    return updatedMarkers;
  });

  // Update input fields
  setInputLat(formattedCoordinate.latitude.toString());
  setInputLng(formattedCoordinate.longitude.toString());
};
