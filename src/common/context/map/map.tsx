import { createContext, useId, useMemo } from 'react';

import type { MapContextProps, MapContextProviderProps } from './map.interface';

export const MapContext = createContext<MapContextProps>({} as MapContextProps);

export const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const id = useId();

  const contextValue = useMemo<MapContextProps>(() => ({ id }), [id]);

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
