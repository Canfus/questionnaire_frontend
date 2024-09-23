export interface FilePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string[];
  maxSize?: number;
  limit?: number;
  multiple?: boolean;
  disabled?: boolean;
  onPick?: (file: File[]) => void;
}
