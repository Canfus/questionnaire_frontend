import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { Router } from '@app/router';
import {
  SuspenseFallback,
  ErrorBoundaryFallback,
  NotificationsRoot,
} from '@app/common';

export const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorBoundaryFallback}>
        <Router />
        <NotificationsRoot />
      </ErrorBoundary>
    </Suspense>
  );
};
