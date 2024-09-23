import classNames from 'classnames';
import { forwardRef } from 'react';

import {
  Dialog,
  MapControlDescription,
  ZoomInIcon,
  ExpandIcon,
  NavigateIcon,
  LinkIcon,
  LockIcon,
  VisibleIcon,
  Map,
} from '@app/common';

import type { AboutMapDialogProps } from './aboutMapDialog.interface.ts';
import styles from './aboutMapDialog.module.css';

export const AboutMapDialog = forwardRef<HTMLDivElement, AboutMapDialogProps>(
  ({ className, onOpenChange, ...props }, ref) => (
    <Dialog
      {...props}
      onOpenChange={onOpenChange}
      ref={ref}
      className={classNames(styles.dialog, className)}
    >
      <p className={styles.dialog__description}>
        Ниже представлены справочные материалы по функциям карты, доступным для
        пользователя. Некоторые функции могут быть в другом порядке.
      </p>
      <Map minZoom={8} withSearchParams={false} visibilityPoints={false} />
      <div className={styles['dialog__control-description']}>
        <MapControlDescription icon={<ZoomInIcon />} title="Масштаб">
          Кнопки приближения и отдаления карты
        </MapControlDescription>
        <MapControlDescription
          icon={<ExpandIcon />}
          title="Полноэкранный режим"
        >
          По клику карта разворачивается на весь размер окна браузера
        </MapControlDescription>
        <MapControlDescription
          icon={<NavigateIcon />}
          title="Начальная позиция"
        >
          Кнопка показывает Ваше положение
        </MapControlDescription>
        <MapControlDescription icon={<LinkIcon />} title="Поделиться ссылкой">
          По клику карта копирует в буфер обмена ссылку с текущим положением и
          настройками карты
        </MapControlDescription>
        <MapControlDescription
          icon={<LockIcon />}
          title="Блокировка приближения колесом"
        >
          По клику блокируется возможность управления приближать/отдалять карту
          по колесу мыши
        </MapControlDescription>
        <MapControlDescription
          icon={<VisibleIcon />}
          title="Показать/скрыть идеи на карте"
        >
          По клику скрываются/показываются идеи на карте
        </MapControlDescription>
      </div>
    </Dialog>
  ),
);
AboutMapDialog.displayName = 'AboutMapDialog';
