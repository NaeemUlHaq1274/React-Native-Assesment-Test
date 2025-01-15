// src/hooks/useMarkerManagement.ts

import { useEffect } from "react";
import { MarkerData } from "../types";

interface UseMarkerManagementProps {
  markers: (MarkerData | null)[];
  selectedMarkerIndex: number;
  setInputLat: React.Dispatch<React.SetStateAction<string>>;
  setInputLng: React.Dispatch<React.SetStateAction<string>>;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
}

const useMarkerManagement = ({
  markers,
  selectedMarkerIndex,
  setInputLat,
  setInputLng,
  setInputName,
}: UseMarkerManagementProps) => {
  useEffect(() => {
    const selectedMarker = markers[selectedMarkerIndex];
    if (selectedMarker) {
      setInputLat(selectedMarker.latitude.toString());
      setInputLng(selectedMarker.longitude.toString());
      setInputName(selectedMarker.name);
    }
  }, [selectedMarkerIndex, markers]);
};

export default useMarkerManagement;
