import classNames from 'classnames';
import { forwardRef } from 'react';
import { Item } from '@radix-ui/react-radio-group';

import type { GroupItemProps } from './groupItem.interface';
import styles from './groupItem.module.css';

export const GroupItem = forwardRef<HTMLButtonElement, GroupItemProps>(
  ({ option, className, invalid, returnValue, ...props }, ref) => {
    const { value, label } = option;

    return (
      <Item
        {...props}
        ref={ref}
        value={returnValue ? (returnValue(option) as string) : value}
        disabled={option.disabled}
        className={classNames(
          styles.item,
          {
            [styles['item--invalid']]: invalid,
          },
          className,
        )}
      >
        <div className={styles.indicator__wrapper} />
        {label}
      </Item>
    );
  },
);
GroupItem.displayName = 'GroupItem';
