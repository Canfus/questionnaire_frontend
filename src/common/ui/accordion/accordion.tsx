import classNames from 'classnames';
import { forwardRef, useState } from 'react';

import { ArrowDown } from '@app/common';

import type { AccordionProps } from './accordion.interface';
import styles from './accordion.module.css';

export const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(
  (
    {
      title,
      children,
      icon,
      defaultOpen = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const onOpenChange = () => {
      setIsOpen((prev) => !prev);
    };

    return (
      <div
        {...props}
        className={classNames(
          styles.accordion,
          {
            [styles['accordion--disabled']]: disabled,
          },
          className,
        )}
      >
        <button
          type="button"
          ref={ref}
          onClick={onOpenChange}
          disabled={disabled}
          className={styles.accordion__trigger}
          data-state={isOpen ? 'open' : 'closed'}
          aria-label="Accordion trigger"
        >
          {icon && icon}
          {title}
          <div
            className={styles.trigger__icon}
            data-state={isOpen ? 'open' : 'close'}
          >
            <ArrowDown />
          </div>
        </button>
        <div
          className={styles.accordion__content__wrapper}
          data-state={isOpen ? 'open' : 'closed'}
        >
          <div className={styles.accordion__content}>{children}</div>
        </div>
      </div>
    );
  },
);
Accordion.displayName = 'Accordion';
