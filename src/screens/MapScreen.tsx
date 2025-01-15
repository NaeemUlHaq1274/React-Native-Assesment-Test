// src/screens/MapScreen.tsx

import React, { useState, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapViewComponent from "../components/MapViewComponent";
import MapControls from "../components/MapControls";
import BottomControls from "../components/BottomControls";
import { MarkerData, Region } from "../types";
import { styles as containerStyles } from "../styles/MapScreenStyles";
import { calculateDistance } from "../utils/calculateDistance";
import useLocation from "../hooks/useLocation";
import useMarkerManagement from "../hooks/useMarkerManagement";
import {
  handleMarkerDrag,
  handleMapPress,
} from "../utils/markerHandlers";
import { INITIAL_MARKERS, DEFAULT_REGION, MAP_TYPES, COLORS } from "../constants";
import MapView, { MapType } from "react-native-maps";
import { getZoomedInRegion, getZoomedOutRegion } from "../utils/mapZoom";

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  // State management
  const [markers, setMarkers] = useState<(MarkerData | null)[]>(INITIAL_MARKERS);
  const [mapType, setMapType] = useState<MapType>("standard");
  const [inputLat, setInputLat] = useState("");
  const [inputLng, setInputLng] = useState("");
  const [inputName, setInputName] = useState("");
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);

  // Dropdown Items from constants
  const [dropdownItems] = useState(MAP_TYPES);

  // Custom Hooks
  useLocation({ markers, setMarkers });
  useMarkerManagement({
    markers,
    selectedMarkerIndex,
    setInputLat,
    setInputLng,
    setInputName,
  });

  // Functions
  const setMarkerFromInput = () => {
    const lat = parseFloat(inputLat);
    const lng = parseFloat(inputLng);

    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert(
        "Invalid Input",
        "Please enter valid latitude and longitude."
      );
      return;
    }

    if (!inputName.trim()) {
      Alert.alert("Invalid Input", "Please enter a marker name.");
      return;
    }

    const formattedLat = Number(lat.toFixed(2));
    const formattedLng = Number(lng.toFixed(2));

    setMarkers((prev) => {
      const updatedMarkers = [...prev];
      updatedMarkers[selectedMarkerIndex] = {
        latitude: formattedLat,
        longitude: formattedLng,
        name: inputName.trim(),
      };
      return updatedMarkers;
    });

    // Update input fields with formatted values
    setInputLat(formattedLat.toString());
    setInputLng(formattedLng.toString());
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const zoomIn = () => {
    setRegion((prevRegion) => {
      const newRegion = {
        ...prevRegion,
        ...getZoomedInRegion(prevRegion),
      };
      mapRef.current?.animateToRegion(newRegion, 300);
      return newRegion;
    });
  };
  
  const zoomOut = () => {
    setRegion((prevRegion) => {
      const newRegion = {
        ...prevRegion,
        ...getZoomedOutRegion(prevRegion),
      };
      mapRef.current?.animateToRegion(newRegion, 300);
      return newRegion;
    });
  };
  

  const distance =
    markers[0] && markers[1]
      ? calculateDistance(
          markers[0].latitude,
          markers[0].longitude,
          markers[1].latitude,
          markers[1].longitude
        )
      : 0;

  return (
    <View style={[containerStyles.container, isFullScreen && containerStyles.fullScreen]}>
      <MapViewComponent
        mapRef={mapRef}
        mapType={mapType}
        region={region}
        markers={markers}
        onRegionChangeComplete={setRegion}
        onMapPress={(coordinate) =>
          handleMapPress(
            coordinate,
            selectedMarkerIndex,
            markers,
            setMarkers,
            setInputLat,
            setInputLng
          )
        }
        onMarkerDrag={(index, coordinate) =>
          handleMarkerDrag(
            index,
            coordinate,
            markers,
            setMarkers,
            selectedMarkerIndex,
            setInputLat,
            setInputLng
          )
        }
      />

      <MapControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        toggleFullScreen={toggleFullScreen}
        isFullScreen={isFullScreen}
      />

      {!isFullScreen && (
        <BottomControls
          distance={distance}
          selectedMarkerIndex={selectedMarkerIndex}
          setSelectedMarkerIndex={setSelectedMarkerIndex}
          inputLat={inputLat}
          setInputLat={setInputLat}
          inputLng={inputLng}
          setInputLng={setInputLng}
          inputName={inputName}
          setInputName={setInputName}
          setMarkerFromInput={setMarkerFromInput}
          mapType={mapType}
          setMapType={(type: string) => setMapType(type as MapType)}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          dropdownItems={dropdownItems}
        />
      )}
    </View>
  );
};

export default MapScreen;
