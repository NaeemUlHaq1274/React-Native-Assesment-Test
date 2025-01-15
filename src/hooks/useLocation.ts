// src/hooks/useLocation.ts

import { useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { MarkerData } from "../types";
import { formatCoordinate } from "../utils/formatCoordinate";

interface UseLocationProps {
  markers: (MarkerData | null)[];
  setMarkers: React.Dispatch<React.SetStateAction<(MarkerData | null)[]>>;
}

const useLocation = ({ markers, setMarkers }: UseLocationProps) => {
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to fetch user location."
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const formattedLat = formatCoordinate(location.coords.latitude);
        const formattedLng = formatCoordinate(location.coords.longitude);

        setMarkers((prev) => [
          prev[0],
          {
            latitude: formattedLat,
            longitude: formattedLng,
            name: "Current Location",
          },
        ]);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch location. Please try again.");
      }
    };

    getUserLocation();
  }, []);
};

export default useLocation;
