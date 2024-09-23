import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, type RadioOption } from '@app/common';

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    className: {
      control: false,
    },
    options: {
      control: false,
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: RadioOption[] = [
  {
    id: 0,
    value: '001',
    label: 'Test 1',
  },
  {
    id: 1,
    value: '002',
    label: 'Test 2',
  },
  {
    id: 2,
    value: '003',
    label: 'Test 3',
    disabled: true,
  },
  {
    id: 3,
    value: '004',
    label: 'Test 4',
  },
];

export const Primary: Story = {
  args: {
    options,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};
