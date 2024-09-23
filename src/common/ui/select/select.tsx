import classNames from 'classnames';
import {
  forwardRef,
  useMemo,
  useState,
  useEffect,
  type ForwardedRef,
} from 'react';

import { ArrowDown } from '@app/common';

import type { SelectProps } from './select.interface';
import styles from './select.module.css';

export const Select = forwardRef(
  (
    {
      placeholder,
      options,
      disabled,
      value,
      onValueChange,
      displayValue,
      invalid,
      className,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpenChange = () => {
      setIsOpen((prev) => !prev);
    };

    useEffect(() => {
      const onKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange();
        }
      };

      document.addEventListener('keydown', onKeyPress);

      return () => {
        document.removeEventListener('keydown', onKeyPress);
      };
    }, []);

    const label = useMemo<string>(() => {
      if (displayValue && value) {
        return displayValue(value);
      }

      if (value) {
        return value.label;
      }

      return placeholder;
    }, [displayValue, value, placeholder]);

    return (
      <div
        {...props}
        className={classNames(styles.select, className)}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <button
          ref={ref}
          type="button"
          onClick={onOpenChange}
          className={classNames(styles.select__trigger, {
            [styles['select__trigger--invalid']]: invalid,
          })}
          data-state={isOpen ? 'open' : 'closed'}
          disabled={!options.length || disabled}
        >
          {label}
          <div
            className={styles.trigger__icon}
            data-state={isOpen ? 'open' : 'closed'}
          >
            <ArrowDown />
          </div>
        </button>
        <div
          className={styles.select__options__wrapper}
          data-state={isOpen ? 'open' : 'closed'}
        >
          {isOpen && (
            <div
              className={styles.overlay}
              role="dialog"
              onClick={onOpenChange}
              aria-hidden
            />
          )}
          <ul className={styles.select__options}>
            {options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (onValueChange) {
                      onValueChange(option);
                      onOpenChange();
                    }
                  }}
                  className={styles.options__item}
                  disabled={option.disabled}
                  data-selected={value?.id === option.id}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
Select.displayName = 'Select';
