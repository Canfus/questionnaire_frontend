import type { LatLngExpression } from 'leaflet';

export interface GeolocationContextProps {
  location: LatLngExpression | null;
  setLocation: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
}

export interface GeolocationProviderProps {
  children: React.ReactNode;
}
