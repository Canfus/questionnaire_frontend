import type { Meta, StoryObj } from '@storybook/react';

import { FilePicker } from '@app/common';

const meta = {
  title: 'UI/FilePicker',
  component: FilePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    className: {
      control: false,
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof FilePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
