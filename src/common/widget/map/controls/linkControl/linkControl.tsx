import { DomEvent } from 'leaflet';
import { useSearchParams } from 'react-router-dom';

import { LinkIcon } from '@app/common';

import { copyToClipboard } from './linkControl.utils';
import rootStyles from '../controls.module.css';

export const LinkControl = () => {
  const [searchParams] = useSearchParams();

  const onCopyLink = () => {
    const url = import.meta.env.VITE_FRONT_URL.concat(
      `?${searchParams.toString()}`,
    );

    copyToClipboard(url);
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
        onClick={onCopyLink}
        aria-label="copy map link"
        type="button"
      >
        <LinkIcon />
      </button>
    </div>
  );
};
