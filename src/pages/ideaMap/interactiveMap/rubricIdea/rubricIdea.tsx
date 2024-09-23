import classNames from 'classnames';
import { useState, useEffect } from 'react';

import {
  useGetRubricListQuery,
  useGetRubricByIdQuery,
  type Rubric,
} from '@app/api';
import {
  rubricActions,
  ideaListActions,
  useAppDispatch,
  useAppSelector,
  Button,
} from '@app/common';

import { AddIdeaDialog } from './addIdeaDialog';
import type { RubricIdeaProps } from './rubricIdea.interface';
import styles from './rubricIdea.module.css';

export const RubricIdea = ({ className, ...props }: RubricIdeaProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id: selectedId } =
    useAppSelector((store) => store.rubric.rubric) || {};
  const { set: setIdeaList } = ideaListActions;
  const { setList, set: setRubric } = rubricActions;

  const { data } = useGetRubricListQuery();

  useEffect(() => {
    if (data) {
      dispatch(setList(data));
    }
  }, [data, dispatch, setList]);

  const { data: ideaList, refetch } = useGetRubricByIdQuery(selectedId || 0);

  useEffect(() => {
    if (ideaList) {
      dispatch(setIdeaList(ideaList));
    }
  }, [ideaList, dispatch, setIdeaList]);

  const onDialogOpenChange = () => {
    setDialogOpen((prev) => !prev);
  };

  const onSelectRubricClick = (rubric: Rubric) => {
    refetch();
    dispatch(setRubric(rubric));
  };

  return (
    <div {...props} className={classNames(styles.rubrics__wrapper, className)}>
      <h2 className={styles.rubrics__title}>Рубрики идей:</h2>
      <div className={styles.rubrics__grid}>
        {data.map((rubric) => (
          <div key={rubric.id} className={styles.rubric__wrapper}>
            {rubric.color && (
              <span
                className={styles.rubric__color}
                style={{ backgroundColor: rubric.color }}
              />
            )}
            <button
              onClick={() => onSelectRubricClick(rubric)}
              className={classNames(styles.rubric__title, {
                [styles['rubrics__title--active']]:
                  rubric.id === selectedId || 0,
              })}
            >
              {rubric.title}
              <span className={styles.rubric__count}>{rubric.count}</span>
            </button>
          </div>
        ))}
      </div>
      <Button onClick={onDialogOpenChange}>Добавить свою идею</Button>
      <AddIdeaDialog
        title="Добавить свою идею"
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
      />
    </div>
  );
};
