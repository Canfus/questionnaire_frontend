import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@app/common';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Кнопка',
  },
  argTypes: {
    className: {
      control: false,
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const PrimaryLarge: Story = {
  args: {
    ...Primary.args,
    size: 'large',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const SecondaryLarge: Story = {
  args: {
    ...Secondary.args,
    size: 'large',
  },
};

export const SecondaryDisabled: Story = {
  args: {
    ...Secondary.args,
    disabled: true,
  },
};
