import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  shareReplay,
} from 'rxjs';

import {
  TrainingCaseDetail,
  TrainingCaseSummary,
} from '../models/training-case.model';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  private readonly apiUrl =
    'http://localhost:8080/api/cases';

  private casesCache$?: Observable<
    TrainingCaseSummary[]
  >;

  constructor(
    private readonly http: HttpClient
  ) {}

  getCases(
    forceRefresh = false
  ): Observable<TrainingCaseSummary[]> {
    if (
      forceRefresh ||
      !this.casesCache$
    ) {
      this.casesCache$ = this.http
        .get<TrainingCaseSummary[]>(
          this.apiUrl
        )
        .pipe(
          shareReplay({
            bufferSize: 1,
            refCount: true,
          })
        );
    }

    return this.casesCache$;
  }

  getCaseBySlug(
    slug: string
  ): Observable<TrainingCaseDetail> {
    return this.http.get<TrainingCaseDetail>(
      `${this.apiUrl}/${encodeURIComponent(slug)}`
    );
  }

  clearCache(): void {
    this.casesCache$ = undefined;
  }
}