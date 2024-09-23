import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TextField, Button, type SubmitSuccessHandler } from '@app/common';

import { schema, type Schema } from './withInput.schema';

const meta = {
  title: 'UI/Form/TextField',
  component: TextField,
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
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const WithInput = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const onFormSubmit: SubmitSuccessHandler<Schema> = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <TextField
        control={form.control}
        name="name"
        placeholder="Enter your name"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const Primary: Partial<Story> = {
  render: () => <WithInput />,
};
