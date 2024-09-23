export interface AboutMapDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  open: boolean;
  onOpenChange: () => void;
}
