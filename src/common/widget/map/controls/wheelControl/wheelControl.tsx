import { useSearchParams } from 'react-router-dom';
import { useMap } from 'react-leaflet';
import { DomEvent } from 'leaflet';

import { LockIcon, UnlockIcon } from '@app/common';

import rootStyles from '../controls.module.css';

export const WheelControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const map = useMap();
  const isZoomEnabled = map.scrollWheelZoom.enabled();

  const onToggleLock: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();

    if (isZoomEnabled) {
      map.scrollWheelZoom.disable();

      searchParams.set('lock', 'true');
    } else {
      map.scrollWheelZoom.enable();

      searchParams.set('lock', 'false');
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={rootStyles.control__wrapper}>
      <button
        ref={(node) => {
          if (node) {
            DomEvent.disableClickPropagation(node);
          }
        }}
        className={rootStyles.button}
        onClick={onToggleLock}
        aria-label="lock wheel zoom"
        type="button"
      >
        {isZoomEnabled ? <UnlockIcon /> : <LockIcon />}
      </button>
    </div>
  );
};
