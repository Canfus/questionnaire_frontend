import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@app/common';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Some text',
  },
  argTypes: {
    className: {
      control: false,
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const PrimaryInvalid: Story = {
  args: {
    ...Primary.args,
    invalid: true,
  },
};

export const PrimaryReadonly: Story = {
  args: {
    ...Primary.args,
    value: '123',
    readOnly: true,
  },
};
