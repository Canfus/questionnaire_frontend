import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FilePickerField,
  Button,
  type SubmitSuccessHandler,
} from '@app/common';

import { schema, type Schema } from './withFilePicker.schema.ts';

const meta = {
  title: 'UI/Form/FilePickerField',
  component: FilePickerField,
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
} satisfies Meta<typeof FilePickerField>;

export default meta;
type Story = StoryObj<typeof meta>;

const WithFilePicker = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      files: [],
    },
  });

  const onFormSubmit: SubmitSuccessHandler<Schema> = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <FilePickerField control={form.control} name="files" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const Primary: Partial<Story> = {
  render: () => <WithFilePicker />,
};
