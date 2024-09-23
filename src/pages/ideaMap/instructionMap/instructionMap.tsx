import classNames from 'classnames';
import { useState } from 'react';

import {
  Button,
  MapInstruction,
  ModeratePointIcon,
  PickPointIcon,
  PointAtMapIcon,
  useUserAgent,
} from '@app/common';

import { AboutMapDialog } from './aboutMapDialog';
import type { InstructionMapProps } from './instructionMap.interface';
import styles from './instructionMap.module.css';

export const InstructionMap = ({
  className,
  ...props
}: InstructionMapProps) => {
  const [isMobile] = useUserAgent({ breakpoint: 768 });

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onDialogOpenChange = () => {
    setDialogOpen((prev) => !prev);
  };

  return (
    <div {...props} className={classNames(styles.instruction, className)}>
      <h2 className={styles.instruction__title}>Инструкция по карте</h2>
      <p className={styles.instruction__label}>
        Вы на странице «Карта идей» платформы «Камская агломерация».
      </p>
      <p className={styles.instruction__label}>
        Есть идея, как сделать Камскую агломерацию еще лучше?
        <br />
        Предлагайте! Ваши идеи внимательно изучат разработчики.
      </p>
      <div className={styles.map__instruction__wrapper}>
        <MapInstruction
          className={styles.instruction__item}
          icon={<PickPointIcon />}
          description="Вы предлагаете идеи по развитию камской агломерации"
        />
        <MapInstruction
          className={styles.instruction__item}
          icon={<ModeratePointIcon />}
          description="Разработчики мастер-плана рассматривают и анализируют идеи"
        />
        <MapInstruction
          className={styles.instruction__item}
          icon={<PointAtMapIcon />}
          description="Лучшие идеи найдут отражение в мастер-плане"
        />
      </div>
      <Button
        variant="secondary"
        size={isMobile ? 'medium' : 'large'}
        onClick={onDialogOpenChange}
      >
        Подробнее о карте
      </Button>
      <AboutMapDialog
        title="Функции карты"
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
      />
    </div>
  );
};
