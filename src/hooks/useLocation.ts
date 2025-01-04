import { useEffect, useState } from "react";
import * as Location from "expo-location";

type LocationCoords = Location.LocationObjectCoords | null;

export default function useLocation() {
  const [location, setLocation] = useState<LocationCoords>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return location;
}
