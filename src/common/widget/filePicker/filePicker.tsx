import classNames from 'classnames';
import { forwardRef } from 'react';
import { useFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from 'use-file-picker/validators';

import {
  Button,
  getBytesToMegabytes,
  getErrorMessage,
  getShortName,
} from '@app/common';

import { defaultValues } from './filePicker.constants';
import type { FilePickerProps } from './filePicker.interface';
import styles from './filePicker.module.css';

export const FilePicker = forwardRef<HTMLButtonElement, FilePickerProps>(
  (
    {
      accept = defaultValues.accept,
      maxSize = defaultValues.maxSize,
      limit = defaultValues.limit,
      multiple = defaultValues.multiple,
      className,
      disabled,
      onPick,
      ...props
    },
    ref,
  ) => {
    const { openFilePicker, plainFiles, loading, errors } = useFilePicker({
      readAs: 'DataURL',
      accept,
      multiple,
      validators: [
        new FileAmountLimitValidator({ max: limit }),
        new FileTypeValidator(accept),
        new FileSizeValidator({ maxFileSize: maxSize }),
      ],
      onFilesSelected: ({ plainFiles: files }) => {
        if (onPick) {
          onPick(files);
        }
      },
    });

    return (
      <div {...props} className={classNames(styles.picker, className)}>
        <p className={styles.picker__title}>
          Вы можете прикрепить файл (допустимые расширения: {accept.join(', ')};
          максимальный размер: {getBytesToMegabytes(maxSize)} мб, но не более{' '}
          {limit} шт.)
        </p>
        {errors.length ? (
          <div className={styles.picker__errors}>
            {errors.map((error, index) => (
              <p key={`${error.name}-${index}`}>
                {getErrorMessage(error.name)}
              </p>
            ))}
          </div>
        ) : null}
        <div className={styles.picker__actions}>
          <Button
            ref={ref}
            variant="secondary"
            size="medium"
            type="button"
            disabled={loading || disabled}
            onClick={openFilePicker}
          >
            Прикрепить файлы
          </Button>
          <p className={styles.picker__files}>
            {plainFiles.length
              ? plainFiles.map((file) => getShortName(file.name)).join(', ')
              : 'Выберите файлы'}
          </p>
        </div>
      </div>
    );
  },
);
FilePicker.displayName = 'FilePicker';
