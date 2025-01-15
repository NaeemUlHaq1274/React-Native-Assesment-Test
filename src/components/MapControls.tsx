// src/components/MapControls.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "./common/IconButton";
import { COLORS } from "../constants";

interface MapControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  toggleFullScreen: () => void;
  isFullScreen: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
  zoomIn,
  zoomOut,
  toggleFullScreen,
  isFullScreen,
}) => {
  return (
    <View style={styles.mapControls}>
      <IconButton iconName="plus" onPress={zoomIn} />
      <IconButton iconName="minus" onPress={zoomOut} />
      <IconButton
        iconName={isFullScreen ? "fullscreen-exit" : "fullscreen"}
        onPress={toggleFullScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapControls: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MapControls;
