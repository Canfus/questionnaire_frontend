import type { DialogProps as DialogPrimitiveProps } from '@radix-ui/react-dialog';

export interface DialogProps extends DialogPrimitiveProps {
  container?: HTMLElement | null;
  className?: string;
  modal?: boolean;
}
