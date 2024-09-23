import type { RadioGroupProps as RadioGroupPrimitiveProps } from '@radix-ui/react-radio-group';

import type { RadioOption } from './groupItem';

export interface RadioGroupProps extends RadioGroupPrimitiveProps {
  options: RadioOption[];
  invalid?: boolean;
  returnValue?: (value: RadioOption) => number | string;
}
