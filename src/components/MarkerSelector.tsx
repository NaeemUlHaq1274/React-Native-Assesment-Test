// src/components/MarkerSelector.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "./common/CustomButton";
import { COLORS } from "../constants";

interface MarkerSelectorProps {
  selectedMarkerIndex: number;
  setSelectedMarkerIndex: (index: number) => void;
}

const MarkerSelector: React.FC<MarkerSelectorProps> = ({
  selectedMarkerIndex,
  setSelectedMarkerIndex,
}) => {
  return (
    <View style={styles.markerSelector}>
      <CustomButton
        title="Marker 1"
        onPress={() => setSelectedMarkerIndex(0)}
        style={StyleSheet.flatten([
          styles.selectorButton,
          selectedMarkerIndex === 0 ? styles.selectedButton : {},
        ])}
        textStyle={StyleSheet.flatten([
          styles.selectorButtonText,
          selectedMarkerIndex === 0 ? styles.selectedButtonText : {},
        ])}
      />
      <CustomButton
        title="Marker 2"
        onPress={() => setSelectedMarkerIndex(1)}
        style={StyleSheet.flatten([
          styles.selectorButton,
          selectedMarkerIndex === 1 ? styles.selectedButton : {},
        ])}
        textStyle={StyleSheet.flatten([
          styles.selectorButtonText,
          selectedMarkerIndex === 1 ? styles.selectedButtonText : {},
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  markerSelector: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  selectorButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: COLORS.secondary,
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  selectorButtonText: {
    fontWeight: "bold",
    color: COLORS.text,
  },
  selectedButtonText: {
    color: COLORS.white,
  },
});

export default MarkerSelector;
