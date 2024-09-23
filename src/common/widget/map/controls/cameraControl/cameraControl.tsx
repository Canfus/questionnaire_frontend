import { useContext, useState, useEffect } from 'react';
import { useMapEvent } from 'react-leaflet';
import { DomEvent } from 'leaflet';
import { useSearchParams } from 'react-router-dom';

import {
  NavigateIcon,
  CollapseIcon,
  ExpandIcon,
  GeolocationContext,
  MapContext,
} from '@app/common';

import rootStyles from '../controls.module.css';

export const CameraControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setLocation } = useContext(GeolocationContext);
  const { id } = useContext(MapContext);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const map = useMapEvent('locationfound', ({ latlng }) => {
    setLocation(latlng);

    searchParams.set('lng', String(latlng.lng));
    searchParams.set('lat', String(latlng.lat));

    setSearchParams(searchParams);

    map.flyTo(latlng, 15, {
      animate: true,
    });
  });

  const onNavigateClick = () => {
    map.locate();

    const timeoutId = setTimeout(() => {
      setLocation(null);
      clearTimeout(timeoutId);
    }, 5000);
  };

  const onFullscreenToggle = () => {
    const mapContainer = document.querySelector('div[role="dialog"]');
    const mapRoot = document.getElementById(id);

    if (mapRoot) {
      if (fullscreen) {
        mapRoot.removeAttribute('data-fullscreen');
        document.body.classList.remove('fullscreen');

        if (mapContainer) {
          mapContainer.classList.remove('fullscreen');
        }
      } else {
        mapRoot.setAttribute('data-fullscreen', '');
        document.body.classList.add('fullscreen');

        if (mapContainer) {
          mapContainer.classList.add('fullscreen');
        }
      }

      map.invalidateSize();
    }

    setFullscreen((prev) => !prev);
  };

  useEffect(() => {
    const onKeyPressed = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (fullscreen) {
          onFullscreenToggle();
        }
      }
    };

    document.addEventListener('keydown', onKeyPressed);

    return () => {
      document.removeEventListener('keydown', onKeyPressed);
    };
    // TODO: disable this rule cuz we need add event listener when component did mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={rootStyles.control__wrapper}>
      <button
        ref={(node) => {
          if (node) {
            DomEvent.disableClickPropagation(node);
          }
        }}
        className={rootStyles.button}
        onClick={onNavigateClick}
        aria-label="current position"
        type="button"
      >
        <NavigateIcon />
      </button>
      <span className={rootStyles.divider} />
      <button
        ref={(node) => {
          if (node) {
            DomEvent.disableClickPropagation(node);
          }
        }}
        className={rootStyles.button}
        onClick={onFullscreenToggle}
        aria-label="zoom out"
        type="button"
      >
        {fullscreen ? <CollapseIcon /> : <ExpandIcon />}
      </button>
    </div>
  );
};
