export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: () => void;
  container?: HTMLElement | null;
}
