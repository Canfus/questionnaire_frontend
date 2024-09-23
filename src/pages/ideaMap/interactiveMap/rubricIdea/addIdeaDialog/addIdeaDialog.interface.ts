import z from 'zod';

import { schema } from './addIdeaDialog.schema';

export interface AboutMapDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  open: boolean;
  onOpenChange: () => void;
}

export type Schema = z.infer<typeof schema>;
