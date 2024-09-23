import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SliderField, Button, type SubmitSuccessHandler } from '@app/common';

import { schema, type Schema } from './withSlider.schema';

const meta = {
  title: 'UI/Form/SliderField',
  component: SliderField,
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
} satisfies Meta<typeof SliderField>;

export default meta;
type Story = StoryObj<typeof meta>;

const WithSlider = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      count: [1],
    },
  });

  const onFormSubmit: SubmitSuccessHandler<Schema> = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <SliderField
        control={form.control}
        name="count"
        title="Оцените рубрику"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const Primary: Partial<Story> = {
  render: () => <WithSlider />,
};
