import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, MapType, PROVIDER_GOOGLE } from "react-native-maps";
import { MarkerData, Region } from "../types";

interface MapViewComponentProps {
  mapRef: React.RefObject<MapView>;
  mapType: MapType;
  region: Region;
  markers: (MarkerData | null)[];
  onRegionChangeComplete: (region: Region) => void;
  onMapPress: (coordinate: { latitude: number; longitude: number }) => void;
  onMarkerDrag: (index: number, coordinate: { latitude: number; longitude: number }) => void;
}

const MapViewComponent: React.FC<MapViewComponentProps> = React.memo(
  ({
    mapRef,
    mapType,
    region,
    markers,
    onRegionChangeComplete,
    onMapPress,
    onMarkerDrag,
  }) => {
    // Memoize markers to avoid re-rendering if markers don't change
    const renderedMarkers = useMemo(
      () =>
        markers.map((marker, index) =>
          marker ? (
            <Marker
              key={index}
              coordinate={marker}
              title={marker.name}
              description={`Marker ${index + 1}`}
              draggable
              onDragEnd={(e) =>
                onMarkerDrag(index, e.nativeEvent.coordinate)
              }
            />
          ) : null
        ),
      [markers, onMarkerDrag]
    );

    // Use callback to memoize `onPress` handler
    const handlePress = useCallback(
      (e: any) => {
        onMapPress(e.nativeEvent.coordinate);
      },
      [onMapPress]
    );

    return (
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={handlePress}
      >
        {renderedMarkers}
      </MapView>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapViewComponent;
