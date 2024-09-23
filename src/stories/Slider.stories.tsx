import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Slider } from '@app/common';

const meta = {
  title: 'UI/Slider',
  component: Slider,
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
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const SliderWithState = (
  props: React.ComponentPropsWithoutRef<typeof Slider>,
) => {
  const [value, setValue] = useState<number[]>([1]);

  return <Slider value={value} onValueChange={setValue} {...props} />;
};

export const Primary: Story = {
  args: {
    min: 1,
    max: 10,
  },
  render: (props) => <SliderWithState {...props} />,
};
