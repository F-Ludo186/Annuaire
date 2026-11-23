import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const startedAt = Date.now();

  loading.start();

  return next(req).pipe(
    finalize(() => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, 500 - elapsed);

      setTimeout(() => loading.stop(), remaining);
    })
  );
}
