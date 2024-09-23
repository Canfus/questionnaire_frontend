import classNames from 'classnames';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import {
  useNotification,
  formatRubricListToSelect,
  Dialog,
  StepField,
  TextField,
  SelectField,
  MapField,
  FilePickerField,
  Button,
  type SubmitSuccessHandler,
  type SubmitErrorHandler,
} from '@app/common';
import { useGetRubricListQuery, useCreateIdeaMutation } from '@app/api';

import { schema } from './addIdeaDialog.schema';
import { defaultValues } from './addIdeaDialog.constants';
import type { AboutMapDialogProps, Schema } from './addIdeaDialog.interface';
import styles from './addIdeaDialog.module.css';

export const AddIdeaDialog = forwardRef<HTMLDivElement, AboutMapDialogProps>(
  ({ className, onOpenChange, ...props }, ref) => {
    const queryClient = useQueryClient();

    const { callNotification } = useNotification();

    const { data } = useGetRubricListQuery();

    const {
      handleSubmit,
      control,
      reset,
      formState: { isDirty },
    } = useForm<Schema>({
      resolver: zodResolver(schema),
      defaultValues,
    });

    const { mutate: createIdea } = useCreateIdeaMutation({
      onSuccess: () => {
        reset();

        queryClient.invalidateQueries({
          type: 'all',
        });

        onOpenChange();

        callNotification({
          type: 'success',
          title: 'Спасибо!',
          content: 'Ваша идея отправлена на модерацию',
        });
      },
    });

    const onFormSubmit: SubmitSuccessHandler<Schema> = (values) => {
      console.log(values);

      const formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (value !== null) {
          switch (key) {
            case 'coordinates':
              if (value instanceof Object) {
                if ('lng' in value) {
                  formData.append('longitude', value.lng.toString());
                }
                if ('lat' in value) {
                  formData.append('latitude', value.lat.toString());
                }
              }
              break;
            case 'file':
              if (Array.isArray(value)) {
                const fileKeys = ['one', 'two', 'three', 'four', 'five'];

                value.forEach((file: File, index) => {
                  formData.append(`file_${fileKeys[index]}`, file);
                });
              }
              break;
            default:
              formData.append(key, String(value));
          }
        }
      }

      createIdea(formData);
    };

    const onFormErrorSubmit: SubmitErrorHandler<Schema> = (error) => {
      console.log(error);
    };

    return (
      <Dialog
        {...props}
        onOpenChange={onOpenChange}
        ref={ref}
        className={classNames(styles.dialog, className)}
      >
        <form
          onSubmit={handleSubmit(onFormSubmit, onFormErrorSubmit)}
          className={styles.form}
        >
          <StepField
            required
            stepIndex={1}
            title="Как к вам обращаться"
            render={(props) => (
              <TextField
                {...props}
                control={control}
                name="username"
                placeholder="Например: Иван"
              />
            )}
          />
          <StepField
            required
            stepIndex={2}
            title="Выберите рубрику"
            label="Определите тему вашей идеи, чтобы о ней узнали соответствующие специалисты"
            render={(props) => (
              <SelectField
                {...props}
                control={control}
                name="rubric"
                options={formatRubricListToSelect(data).filter(
                  (option) => option.id !== 0,
                )}
                placeholder="Выберите рубрику"
              />
            )}
          />
          <StepField
            required
            stepIndex={3}
            title="Поставьте точку на карте"
            label="Укажите точное место на карте, к которому относится ваша идея. Чем определеннее локация, тем эффективнее будут наши решения"
            render={(props) => (
              <MapField
                {...props}
                control={control}
                name="coordinates"
                withForm
                withSearchParams={false}
                minZoom={8}
                visibilityPoints={false}
              />
            )}
          />
          <StepField
            required
            stepIndex={4}
            title="Назовите идею"
            label="Сформулируйте название идеи в 2-3 словах, в виде основного тезиса или названия объекта"
            render={(props) => (
              <TextField
                {...props}
                control={control}
                name="title"
                placeholder="Например: Критическая ситуация в парке"
              />
            )}
          />
          <StepField
            required
            stepIndex={5}
            title="Опишите идею"
            label="Сформулируйте краткое описание идеи (макс. 255 символов)"
            render={(props) => (
              <TextField
                {...props}
                control={control}
                name="description"
                limit={255}
                placeholder="Например: В парке мало скамеек"
              />
            )}
          />
          <StepField
            stepIndex={6}
            title="Укажите email"
            label="Вы можете оставить свой email"
            render={(props) => (
              <TextField
                {...props}
                control={control}
                name="email"
                placeholder="Например: my@email.ru"
              />
            )}
          />
          <StepField
            stepIndex={7}
            title="Прикрепите файлы"
            render={(props) => (
              <FilePickerField {...props} control={control} name="file" />
            )}
          />
          <Button className={styles.form__submit} disabled={!isDirty}>
            Отправить идею
          </Button>
        </form>
      </Dialog>
    );
  },
);
AddIdeaDialog.displayName = 'AboutMapDialog';
