export interface SelectOption {
  id: number | string;
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  options: SelectOption[];
  disabled?: boolean;
  value?: SelectOption | null;
  onValueChange?: (option: SelectOption) => void;
  displayValue?: (option: SelectOption) => string;
  invalid?: boolean;
}
