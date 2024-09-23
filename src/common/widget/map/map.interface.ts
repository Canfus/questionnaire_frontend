import type { MapContainerProps } from 'react-leaflet';
import type { LatLng } from 'leaflet';

export interface MapProps extends MapContainerProps {
  onMapReady?: () => void;
  withSearchParams?: boolean;
  position?: LatLng | null;
  setPosition?: (position: LatLng) => void;
  invalid?: boolean;
  withForm?: boolean;
  visibilityPoints?: boolean;
}
