// src/utils/mapZoomUtils.ts

/**
 * Calculates the new region for zooming in.
 * @param region - The current map region.
 * @returns Updated region after zooming in.
 */
export const getZoomedInRegion = (region: {
    latitudeDelta: number;
    longitudeDelta: number;
  }) => {
    return {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
  };
  
  /**
   * Calculates the new region for zooming out.
   * @param region - The current map region.
   * @returns Updated region after zooming out.
   */
  export const getZoomedOutRegion = (region: {
    latitudeDelta: number;
    longitudeDelta: number;
  }) => {
    return {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
  };
  