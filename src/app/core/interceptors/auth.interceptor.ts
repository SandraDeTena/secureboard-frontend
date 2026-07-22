import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthStorageService } from '../services/auth-storage.service';

export const authInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const authStorage = inject(AuthStorageService);
  const router = inject(Router);
  const accessToken = authStorage.getAccessToken();

  const isBackendRequest = request.url.startsWith(
    'http://localhost:8080/api/'
  );

  const authenticatedRequest =
    accessToken && isBackendRequest
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : request;

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        isBackendRequest
      ) {
        authStorage.clearSession();
        void router.navigateByUrl('/');
      }

      return throwError(() => error);
    })
  );
};