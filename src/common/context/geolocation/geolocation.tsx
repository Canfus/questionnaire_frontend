import { createContext, useState, useMemo } from 'react';
import type { LatLngExpression } from 'leaflet';

import type {
  GeolocationContextProps,
  GeolocationProviderProps,
} from './geolocation.interface';

export const GeolocationContext = createContext<GeolocationContextProps>(
  {} as GeolocationContextProps,
);

export const GeolocationProvider = ({ children }: GeolocationProviderProps) => {
  const [location, setLocation] = useState<LatLngExpression | null>(null);

  const contextValue = useMemo<GeolocationContextProps>(
    () => ({ location, setLocation }),
    [location],
  );

  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  );
};
