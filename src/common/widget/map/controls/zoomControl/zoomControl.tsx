import { useMap } from 'react-leaflet';
import { DomEvent } from 'leaflet';

import { ZoomInIcon, ZoomOutIcon } from '@app/common';

import rootStyles from '../controls.module.css';

export const ZoomControl = () => {
  const map = useMap();

  const onZoomOut = () => {
    map.zoomOut();
  };

  const onZoomIn = () => {
    map.zoomIn();
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
        onClick={onZoomIn}
        aria-label="zoom in"
        type="button"
      >
        <ZoomInIcon />
      </button>
      <span className={rootStyles.divider} />
      <button
        ref={(node) => {
          if (node) {
            DomEvent.disableClickPropagation(node);
          }
        }}
        className={rootStyles.button}
        onClick={onZoomOut}
        aria-label="zoom out"
        type="button"
      >
        <ZoomOutIcon />
      </button>
    </div>
  );
};
