import type { RadioGroupItemProps } from '@radix-ui/react-radio-group';

export interface RadioOption {
  id: number | string;
  value: string;
  label: string;
  disabled?: boolean;
}

export interface GroupItemProps extends Omit<RadioGroupItemProps, 'value'> {
  option: RadioOption;
  invalid: boolean;
  returnValue?: (value: RadioOption) => number | string;
}
