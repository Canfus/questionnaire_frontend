import type { FC } from 'react';

interface RenderProps {
  required?: boolean;
}

export type StepFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  stepIndex: number;
  required?: boolean;
  title: string;
  render: FC<RenderProps>;
  label?: string;
};
