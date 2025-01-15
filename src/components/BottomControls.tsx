// src/components/BottomControls.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Dropdown from "./common/Dropdown";
import MarkerSelector from "./MarkerSelector";
import InputFields from "./InputFields";
import CustomButton from "./common/CustomButton";
import { COLORS } from "../constants";

interface BottomControlsProps {
  distance: number;
  selectedMarkerIndex: number;
  setSelectedMarkerIndex: (index: number) => void;
  inputLat: string;
  setInputLat: (lat: string) => void;
  inputLng: string;
  setInputLng: (lng: string) => void;
  inputName: string;
  setInputName: (name: string) => void;
  setMarkerFromInput: () => void;
  mapType: string;
  setMapType: (type: string) => void;
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownItems: any[];
}

const BottomControls: React.FC<BottomControlsProps> = ({
  distance,
  selectedMarkerIndex,
  setSelectedMarkerIndex,
  inputLat,
  setInputLat,
  inputLng,
  setInputLng,
  inputName,
  setInputName,
  setMarkerFromInput,
  mapType,
  setMapType,
  dropdownOpen,
  setDropdownOpen,
  dropdownItems,
}) => {
  return (
    <View style={styles.controls}>
      <Text style={styles.distanceText}>
        {distance > 0
          ? `Distance: ${distance.toFixed(2)} meters`
          : "Add two markers to calculate distance"}
      </Text>

      <MarkerSelector
        selectedMarkerIndex={selectedMarkerIndex}
        setSelectedMarkerIndex={setSelectedMarkerIndex}
      />

      <InputFields
        inputLat={inputLat}
        setInputLat={setInputLat}
        inputLng={inputLng}
        setInputLng={setInputLng}
        inputName={inputName}
        setInputName={setInputName}
      />

      <CustomButton title="Set Marker" onPress={setMarkerFromInput} />

      <Dropdown
        open={dropdownOpen}
        value={mapType}
        items={dropdownItems}
        setOpen={setDropdownOpen}
        setValue={setMapType}
        placeholder="Select Map Type"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  distanceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
    textAlign: "center",
  },
});

export default BottomControls;
