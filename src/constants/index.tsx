// src/constants/index.ts

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

export const MAP_TYPES = [
  {
    label: "Standard",
    value: "standard",
    icon: () => <Icon name="map" size={18} color="#3498db" />,
  },
  {
    label: "Satellite",
    value: "satellite",
    icon: () => <Icon name="satellite-variant" size={18} color="#3498db" />,
  },
  {
    label: "Terrain",
    value: "terrain",
    icon: () => <Icon name="terrain" size={18} color="#3498db" />,
  },
];

export const INITIAL_MARKERS = [
  { latitude: 34.8358, longitude: 72.4436, name: "Destination" },
  null,
];

export const DEFAULT_REGION = {
  latitude: 34.8358,
  longitude: 72.4436,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export const COLORS = {
  primary: "#3498db",
  secondary: "#e0e0e0",
  text: "#333",
  white: "#fff",
  gray: "#ccc",
  darkGray: "#999",
  // Add more colors as needed
};

// Add any other constants here (e.g., strings, default values)
