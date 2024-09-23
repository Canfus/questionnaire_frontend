import { createContext, useMemo } from 'react';
import { useLocalStorage } from 'react-use';

import type {
  FavoriteIdeasContextProps,
  FavoriteIdeasProviderProps,
} from './favoriteIdeas.interface';

export const FavoriteIdeasContext = createContext<FavoriteIdeasContextProps>(
  {} as FavoriteIdeasContextProps,
);

export const FavoriteIdeasProvider = ({
  children,
}: FavoriteIdeasProviderProps) => {
  const [favoriteIds, updateFavoriteIds] = useLocalStorage<number[]>(
    'favorite_ideas',
    [],
  );

  const contextValue = useMemo<FavoriteIdeasContextProps>(
    () => ({ favoriteIds, updateFavoriteIds }),
    [favoriteIds, updateFavoriteIds],
  );

  return (
    <FavoriteIdeasContext.Provider value={contextValue}>
      {children}
    </FavoriteIdeasContext.Provider>
  );
};
