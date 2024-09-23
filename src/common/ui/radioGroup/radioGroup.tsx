import classNames from 'classnames';
import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-radio-group';

import { GroupItem } from './groupItem';
import type { RadioGroupProps } from './radioGroup.interface';
import styles from './radioGroup.module.css';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, className, invalid = false, returnValue, ...props }, ref) => (
    <Root {...props} ref={ref} className={classNames(styles.group, className)}>
      {options.map((option) => (
        <GroupItem
          key={option.id}
          option={option}
          returnValue={returnValue}
          invalid={invalid}
        />
      ))}
    </Root>
  ),
);
RadioGroup.displayName = 'RadioGroup';
