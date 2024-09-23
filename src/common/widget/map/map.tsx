import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  GeoJSON,
} from 'react-leaflet';
import { Map as TMap, type LatLng } from 'leaflet';
import { useSearchParams } from 'react-router-dom';

import {
  GeolocationContext,
  MapContext,
  VisibilityPointsContext,
  MapContextProvider,
  FavoriteIdeasProvider,
  VisibilityPointsProvider,
  useAppSelector,
} from '@app/common';
import geoData from '@app/assets/geo/geoData.json';

import { getMarkerInstance } from './map.utils';
import { Popup } from './popup';
import { LayerControl } from './controls';
import type { MapProps } from './map.interface';
import styles from './map.module.css';

export const InnerComponent = ({
  className,
  center = [55.741272, 52.403662],
  zoom = 9,
  minZoom = 9,
  scrollWheelZoom = false,
  onMapReady,
  withSearchParams = false,
  position,
  setPosition,
  maxBounds = [
    [56.1964, 50.9696],
    [54.9446, 53.6304],
  ],
  ...props
}: MapProps) => {
  const [map, setMap] = useState<TMap | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { location, setLocation } = useContext(GeolocationContext);
  const { id } = useContext(MapContext);
  const { visibilityPoints } = useContext(VisibilityPointsContext);
  const { ideaList } = useAppSelector((store) => store.ideaList);
  const { rubricList } = useAppSelector((store) => store.rubric);

  useEffect(() => {
    const onMapResize = () => {
      if (map) {
        map.invalidateSize();
      }
    };

    const onPositionChange = () => {
      const position: LatLng | null = map?.getCenter() || null;

      if (position) {
        searchParams.set('lat', String(position.lat));
        searchParams.set('lng', String(position.lng));
      }

      setSearchParams(searchParams);
    };

    const onZoomChange = () => {
      const zoom: number | null = map?.getZoom() || null;

      if (zoom) {
        searchParams.set('zoom', String(zoom));
      }

      setSearchParams(searchParams);
    };

    if (map) {
      map.addEventListener('resize', onMapResize);

      if (withSearchParams) {
        map.addEventListener('dragend', onPositionChange);
        map.addEventListener('zoom', onZoomChange);
      }
    }

    return () => {
      if (map) {
        map.removeEventListener('resize', onMapResize);

        if (withSearchParams) {
          map.removeEventListener('dragend', onPositionChange);
          map.removeEventListener('zoom', onZoomChange);
        }
      }
    };
  }, [map, searchParams, setPosition, setSearchParams, withSearchParams]);

  return (
    <MapContainer
      {...props}
      id={id}
      maxBounds={maxBounds}
      ref={setMap}
      center={
        searchParams.has('lat') && searchParams.has('lng')
          ? {
              lng: Number(searchParams.get('lng')),
              lat: Number(searchParams.get('lat')),
            }
          : center
      }
      zoom={searchParams.has('zoom') ? Number(searchParams.get('zoom')) : zoom}
      minZoom={minZoom}
      zoomControl={false}
      scrollWheelZoom={
        searchParams.has('lock')
          ? searchParams.get('lock') === 'false'
          : scrollWheelZoom
      }
      whenReady={onMapReady}
      className={classNames(styles.map, className)}
    >
      {geoData && (
        <GeoJSON
          data={geoData as never}
          eventHandlers={
            setPosition
              ? {
                  click: (event) => {
                    if (setPosition) {
                      setPosition(event.latlng);
                    }
                  },
                }
              : undefined
          }
        />
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        detectRetina
      />
      <LayerControl
        zoomControl
        cameraControl
        linkControl
        visibleControl
        wheelControl
      />
      {visibilityPoints && ideaList && (
        <FavoriteIdeasProvider>
          {ideaList.map((idea) => {
            const rootRubric = rubricList.find(
              (rubric) => rubric.id === idea.rubric,
            );

            return (
              <Marker
                key={idea.id}
                position={{
                  lat: idea.latitude,
                  lng: idea.longitude,
                }}
                icon={getMarkerInstance(
                  rootRubric ? rootRubric.color : undefined,
                )}
              >
                <Popup offset={[0, -6]} idea={idea} rubric={rootRubric} />
              </Marker>
            );
          })}
        </FavoriteIdeasProvider>
      )}
      {location && (
        <Marker
          position={location}
          icon={getMarkerInstance()}
          eventHandlers={{
            click: () => {
              setLocation(null);
            },
          }}
        >
          <Tooltip
            permanent
            direction="top"
            position={location}
            offset={[0, -12]}
          >
            Вы здесь
          </Tooltip>
        </Marker>
      )}
      {position && (
        <Marker position={position} icon={getMarkerInstance()}>
          <Tooltip
            permanent
            direction="top"
            position={position}
            offset={[0, -12]}
          >
            Ваша точка
          </Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
};

export const Map = ({ visibilityPoints, ...props }: MapProps) => (
  <MapContextProvider>
    <VisibilityPointsProvider visibilityPoints={visibilityPoints}>
      <InnerComponent {...props} />
    </VisibilityPointsProvider>
  </MapContextProvider>
);
