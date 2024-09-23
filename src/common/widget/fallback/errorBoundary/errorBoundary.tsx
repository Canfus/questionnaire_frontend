import { useNavigate } from 'react-router-dom';
import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@app/common';

import styles from './errorBoundary.module.css';

export const ErrorBoundaryFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate();

  const body = error?.message || 'Что-то пошло не так!';

  const onResetClick = () => {
    resetErrorBoundary();
    navigate('/');
  };

  return (
    <div className={styles.fallback}>
      <p className={styles.fallback__message}>{body}</p>
      <Button type="button" onClick={onResetClick}>
        На главную
      </Button>
    </div>
  );
};
