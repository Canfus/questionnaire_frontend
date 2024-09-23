export interface FavoriteIdeasContextProps {
  favoriteIds: number[] | undefined;
  updateFavoriteIds: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}

export interface FavoriteIdeasProviderProps {
  children: React.ReactNode;
}
