import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  RadioGroupField,
  Button,
  type SubmitSuccessHandler,
  type RadioOption,
} from '@app/common';

import { schema, type Schema } from './withRadioGroup.schema';

const meta = {
  title: 'UI/Form/RadioGroupField',
  component: RadioGroupField,
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
} satisfies Meta<typeof RadioGroupField>;

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

const WithRadioGroup = () => {
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
      <RadioGroupField
        options={options}
        control={form.control}
        name="item"
        title="Pick any item"
        index={1}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const Primary: Partial<Story> = {
  render: () => <WithRadioGroup />,
};
