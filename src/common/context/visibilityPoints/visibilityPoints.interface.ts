export interface VisibilityPointsContextProps {
  visibilityPoints: boolean;
  setVisibilityPoints: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VisibilityPointsProviderProps {
  children: React.ReactNode;
  visibilityPoints?: boolean;
}
