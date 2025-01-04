import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker, MapType, PROVIDER_GOOGLE } from "react-native-maps";
import DropDownPicker from "react-native-dropdown-picker";
import * as Location from "expo-location";
import { calculateDistance } from "../utils/calculateDistance";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface MarkerData {
  latitude: number;
  longitude: number;
  name: string;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const INITIAL_MARKERS: (MarkerData | null)[] = [
    { latitude: 35.22, longitude: 72.43, name: "Destination" },
    null,
  ];

  // State management
  const [markers, setMarkers] =
    useState<(MarkerData | null)[]>(INITIAL_MARKERS);
  const [mapType, setMapType] = useState<MapType>("standard");
  const [inputLat, setInputLat] = useState("");
  const [inputLng, setInputLng] = useState("");
  const [inputName, setInputName] = useState("");
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: 35.22,
    longitude: 72.43,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const [dropdownItems] = useState([
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
  ]);

  // Update input fields when marker is selected
  useEffect(() => {
    const selectedMarker = markers[selectedMarkerIndex];
    if (selectedMarker) {
      setInputLat(selectedMarker.latitude.toString());
      setInputLng(selectedMarker.longitude.toString());
      setInputName(selectedMarker.name);
    }
  }, [selectedMarkerIndex, markers]);

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

  const formatCoordinate = (value: number): number => {
    return Number(value.toFixed(2));
  };

  const onMarkerDrag = (
    index: number,
    coordinate: { latitude: number; longitude: number }
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

  const onMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    const formattedCoordinate = {
      latitude: formatCoordinate(coordinate.latitude),
      longitude: formatCoordinate(coordinate.longitude),
    };

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

    const formattedLat = formatCoordinate(lat);
    const formattedLng = formatCoordinate(lng);

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
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
    mapRef.current?.animateToRegion(
      {
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      },
      300
    );
  };

  const zoomOut = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
    mapRef.current?.animateToRegion(
      {
        ...region,
        latitudeDelta: region.latitudeDelta * 2,
        longitudeDelta: region.longitudeDelta * 2,
      },
      300
    );
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
    <View style={[styles.container, isFullScreen && styles.fullScreen]}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={mapType}
          region={region}
          onRegionChangeComplete={setRegion}
          onPress={onMapPress}
        >
          {markers.map((marker, index) =>
            marker ? (
              <Marker
                key={index}
                coordinate={marker}
                title={marker.name}
                description={`Marker ${index + 1}`}
                draggable
                onDragEnd={(e) => onMarkerDrag(index, e.nativeEvent.coordinate)}
              />
            ) : null
          )}
        </MapView>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapButton} onPress={zoomIn}>
            <Icon name="plus" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} onPress={zoomOut}>
            <Icon name="minus" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} onPress={toggleFullScreen}>
            <Icon
              name={isFullScreen ? "fullscreen-exit" : "fullscreen"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      </View>

      {!isFullScreen && (
        <View style={styles.controls}>
          <Text style={styles.distanceText}>
            {distance > 0
              ? `Distance: ${distance.toFixed(2)} meters`
              : "Add two markers to calculate distance"}
          </Text>

          <View style={styles.markerSelector}>
            <TouchableOpacity
              style={[
                styles.selectorButton,
                selectedMarkerIndex === 0 && styles.selectedButton,
              ]}
              onPress={() => setSelectedMarkerIndex(0)}
            >
              <Text style={styles.selectorButtonText}>Marker 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.selectorButton,
                selectedMarkerIndex === 1 && styles.selectedButton,
              ]}
              onPress={() => setSelectedMarkerIndex(1)}
            >
              <Text style={styles.selectorButtonText}>Marker 2</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              keyboardType="numeric"
              value={inputLat}
              onChangeText={setInputLat}
              maxLength={10}
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              keyboardType="numeric"
              value={inputLng}
              onChangeText={setInputLng}
              maxLength={10}
            />
          </View>
          <TextInput
            style={styles.nameInput}
            placeholder="Marker Name"
            value={inputName}
            onChangeText={setInputName}
          />
          <TouchableOpacity
            style={styles.setMarkerButton}
            onPress={setMarkerFromInput}
          >
            <Text style={styles.setMarkerButtonText}>Set Marker</Text>
          </TouchableOpacity>
          <DropDownPicker
            open={dropdownOpen}
            value={mapType}
            items={dropdownItems}
            setOpen={setDropdownOpen}
            setValue={setMapType}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Select Map Type"
            placeholderStyle={styles.dropdownPlaceholder}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapButton: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  controls: {
    padding: 16,
    backgroundColor: "#f9f9f9",
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
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  markerSelector: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  selectorButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#3498db",
  },
  selectorButtonText: {
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  setMarkerButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  setMarkerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 10,
    height: 50,
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderRadius: 10,
  },
  dropdownPlaceholder: {
    color: "#999",
    fontSize: 14,
  },
});
