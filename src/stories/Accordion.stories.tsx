import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '@app/common';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Жилье',
  },
  argTypes: {
    className: {
      control: false,
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas volutpat dapibus. Sed at eleifend erat, nec tincidunt massa. Quisque iaculis, leo nec suscipit viverra, sapien diam dapibus neque, at tempor dolor urna ac purus. Phasellus gravida egestas lectus, nec tempor justo. Vestibulum non orci eget nisl viverra dapibus a eu nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in felis luctus, porta quam in, fringilla lectus.',
  },
};
