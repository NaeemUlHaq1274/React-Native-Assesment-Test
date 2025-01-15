// src/types/index.ts

export interface MarkerData {
  latitude: number;
  longitude: number;
  name: string;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
