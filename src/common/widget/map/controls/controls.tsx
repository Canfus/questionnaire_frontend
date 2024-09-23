import classNames from 'classnames';
import { forwardRef } from 'react';

import { ZoomControl } from './zoomControl';
import { CameraControl } from './cameraControl';
import { LinkControl } from './linkControl';
import { VisibleControl } from './visibleControl';
import { WheelControl } from './wheelControl';
import type { ControlsProps } from './controls.interface';
import styles from './controls.module.css';

export const LayerControl = forwardRef<HTMLDivElement, ControlsProps>(
  (
    {
      zoomControl,
      cameraControl,
      linkControl,
      wheelControl,
      visibleControl,
      className,
      ...props
    },
    ref,
  ) => {
    if (!zoomControl && !cameraControl && !linkControl && !wheelControl) {
      return null;
    }

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(styles.layer__control, className)}
      >
        {zoomControl && <ZoomControl />}
        {cameraControl && <CameraControl />}
        {wheelControl && <WheelControl />}
        {visibleControl && <VisibleControl />}
        {linkControl && <LinkControl />}
      </div>
    );
  },
);
LayerControl.displayName = 'LayerControl';
