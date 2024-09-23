export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  open: boolean;
  onOpenChange: () => void;
  container?: HTMLElement | null;
}
