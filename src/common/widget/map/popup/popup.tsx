import classNames from 'classnames';
import { useMemo, useContext } from 'react';
import { Popup as PopupLeaflet } from 'react-leaflet';

import { FavoriteIdeasContext } from '@app/common';
import { useGetIdeaByIdQuery, useLikeMutation } from '@app/api';

import type { PopupProps } from './popup.interface';
import styles from './popup.module.css';

export const Popup = ({ idea, rubric, className, ...props }: PopupProps) => {
  const { data, isLoading, refetch } = useGetIdeaByIdQuery(idea.id);
  const { favoriteIds, updateFavoriteIds } = useContext(FavoriteIdeasContext);

  const { mutate } = useLikeMutation({
    onSuccess: () => {
      console.log('success like');

      if (favoriteIds) {
        if (favoriteIds.includes(idea.id)) {
          const updatedIds = favoriteIds.filter((id) => id !== idea.id);
          updateFavoriteIds(updatedIds);
        } else {
          const updatedIds = [...favoriteIds, idea.id];
          updateFavoriteIds(updatedIds);
        }
      }

      refetch();
    },
  });

  const favorite = useMemo<boolean>(() => {
    if (favoriteIds) {
      return favoriteIds.includes(idea.id);
    }
    return false;
  }, [favoriteIds, idea.id]);

  const onLikeClick = () => {
    mutate({ id: idea.id, status: favorite });
  };

  return (
    <PopupLeaflet
      {...props}
      className={classNames(styles.popup__idea, className)}
    >
      {isLoading ? (
        <>loading...</>
      ) : (
        <>
          <h4 className={styles.idea__title}>{data?.title}</h4>
          <p className={styles.rubric__name}>
            <span
              className={styles.rubric__color}
              style={{ backgroundColor: rubric?.color }}
            />
            {rubric?.title || ''}
          </p>
          <p>{data?.description}</p>
          <button
            type="button"
            className={styles.like__button}
            onClick={onLikeClick}
          >
            <span
              className={classNames(styles.like__icon, {
                [styles['like__icon--fulfilled']]: favorite,
              })}
            >
              &hearts;
            </span>
            {data?.likes}
          </button>
        </>
      )}
    </PopupLeaflet>
  );
};
