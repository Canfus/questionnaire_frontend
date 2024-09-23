import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  SelectField,
  Button,
  type SubmitSuccessHandler,
  type SelectOption,
} from '@app/common';

import { schema, type Schema } from './withSelect.schema';

const meta = {
  title: 'UI/Form/SelectField',
  component: SelectField,
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
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: SelectOption[] = [
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
];

const WithSelect = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      item: null,
    },
  });

  const onFormSubmit: SubmitSuccessHandler<Schema> = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <SelectField
        options={options}
        control={form.control}
        name="item"
        placeholder="Pick any item"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const Primary: Partial<Story> = {
  render: () => <WithSelect />,
};
