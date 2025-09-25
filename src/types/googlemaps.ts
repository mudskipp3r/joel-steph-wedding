// Google Maps type declarations - shared across components
export interface GoogleMapsApi {
  maps: {
    Map: new (element: HTMLElement, options: unknown) => GoogleMapsMap;
    Marker: new (options: unknown) => GoogleMapsMarker;
    InfoWindow: new (options?: unknown) => GoogleMapsInfoWindow;
    Size: new (width: number, height: number) => unknown;
    Point: new (x: number, y: number) => unknown;
    LatLng: new (lat: number, lng: number) => unknown;
    LatLngBounds: new () => GoogleMapsLatLngBounds;
    SymbolPath: {
      CIRCLE: unknown;
      [key: string]: unknown;
    };
    Animation: {
      DROP: unknown;
    };
    event: {
      addListenerOnce: (instance: unknown, eventName: string, handler: () => void) => void;
      addListener: (instance: unknown, eventName: string, handler: (error?: unknown) => void) => void;
    };
  };
}

export interface GoogleMapsMap {
  setZoom(zoom: number): void;
  panTo(coords: { lat: number; lng: number }): void;
  getCenter(): { lat(): number; lng(): number } | null;
  setCenter: (latLng: unknown) => void;
  fitBounds: (bounds: unknown) => void;
}

export interface GoogleMapsMarker {
  addListener(eventName: string, handler: () => void): void;
  setMap: (map: GoogleMapsMap | null) => void;
}

export interface GoogleMapsInfoWindow {
  setContent: (content: string) => void;
  open: (map: GoogleMapsMap, marker: GoogleMapsMarker) => void;
  close: () => void;
}

export interface GoogleMapsLatLngBounds {
  extend: (latLng: unknown) => void;
}

declare global {
  interface Window {
    google?: GoogleMapsApi;
    initMap?: () => void;
  }
}