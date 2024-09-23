import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select, type SelectOption } from '@app/common';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: false,
    },
    disabled: {
      control: 'boolean',
    },
    value: {
      control: false,
    },
    options: {
      control: false,
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: SelectOption[] = [
  {
    id: 0,
    value: '098',
    label: 'Краснокамский район',
  },
  {
    id: 1,
    value: '012',
    label: 'Уфимский район',
  },
  {
    id: 2,
    value: '864',
    label: 'Киреевский район',
  },
  {
    id: 3,
    value: '110',
    label: 'Набережные Члены',
  },
  {
    id: 4,
    value: '665',
    label: 'Казань',
  },
];

const SelectWithState = (
  props: React.ComponentPropsWithoutRef<typeof Select>,
) => {
  const [value, setValue] = useState<SelectOption | null>(null);

  return <Select {...props} value={value} onValueChange={setValue} />;
};

export const Primary: Partial<Story> = {
  args: {
    placeholder: 'Выберите район',
    displayValue: (option) => option.label,
    options,
  },
  render: (props) => <SelectWithState {...props} />,
};
