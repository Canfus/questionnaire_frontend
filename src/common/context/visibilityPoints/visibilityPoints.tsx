import { createContext, useState, useMemo } from 'react';

import type {
  VisibilityPointsContextProps,
  VisibilityPointsProviderProps,
} from './visibilityPoints.interface';

export const VisibilityPointsContext =
  createContext<VisibilityPointsContextProps>(
    {} as VisibilityPointsContextProps,
  );

export const VisibilityPointsProvider = ({
  visibilityPoints: visible = true,
  children,
}: VisibilityPointsProviderProps) => {
  const [visibilityPoints, setVisibilityPoints] = useState<boolean>(visible);

  const contextValue = useMemo<VisibilityPointsContextProps>(
    () => ({ visibilityPoints, setVisibilityPoints }),
    [visibilityPoints],
  );

  return (
    <VisibilityPointsContext.Provider value={contextValue}>
      {children}
    </VisibilityPointsContext.Provider>
  );
};
