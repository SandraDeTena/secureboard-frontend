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

import { CasePhaseProgress } from '../models/case-phase-progress.model';

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

  getPhaseProgress(
    slug: string
  ): Observable<CasePhaseProgress[]> {
    return this.http.get<CasePhaseProgress[]>(
      `${this.apiUrl}/${encodeURIComponent(slug)}/phases`
    );
  }

  completePhase(
    slug: string,
    phaseNumber: number
  ): Observable<CasePhaseProgress> {
    return this.http.put<CasePhaseProgress>(
      `${this.apiUrl}/${encodeURIComponent(slug)}/phases/${phaseNumber}`,
      {}
    );
  }

  clearCache(): void {
    this.casesCache$ = undefined;
  }

  /* HALLAZGOS */

  getFindings(slug: string): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.apiUrl}/${encodeURIComponent(slug)}/findings`
  );
}

  createFinding(
    slug: string,
    finding: any
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${encodeURIComponent(slug)}/findings`,
      finding
    );
  }

  updateFinding(
    slug: string,
    id: number,
    finding: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${encodeURIComponent(slug)}/findings/${id}`,
      finding
    );
  }

  deleteFinding(
    slug: string,
    id: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${encodeURIComponent(slug)}/findings/${id}`
    );
  }
}

