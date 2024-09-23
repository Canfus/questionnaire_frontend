import { useContext } from 'react';

import { VisibilityPointsContext, VisibleIcon, HideIcon } from '@app/common';

import rootStyles from '../controls.module.css';

export const VisibleControl = () => {
  const { visibilityPoints, setVisibilityPoints } = useContext(
    VisibilityPointsContext,
  );

  const onToggleVisible = () => {
    setVisibilityPoints((prev) => !prev);
  };

  return (
    <div className={rootStyles.control__wrapper}>
      <button
        className={rootStyles.button}
        onClick={onToggleVisible}
        aria-label="toggle visible points"
        type="button"
      >
        {visibilityPoints ? <VisibleIcon /> : <HideIcon />}
      </button>
    </div>
  );
};
