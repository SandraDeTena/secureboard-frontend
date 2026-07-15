import { Injectable, computed, signal } from '@angular/core';
import { CurrentUser } from '../models/current-user.model';

const MOCK_USER: CurrentUser = {
  id: 1,
  displayName: 'Sandra De Tena',
  username: 'sandra.soc',
  email: 'sandra@secureboard.local',
  role: 'SUPER_ADMIN',
  roleLabel: 'Analista SOC',
  avatarUrl: null,
  level: 5,
  points: 4850,
  location: 'Madrid, España',
  bio:
    'Analista en formación especializada en investigación, análisis de alertas y respuesta a incidentes.',
};

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly avatarStorageKey = 'secureboard-user-avatar';

  private readonly userState = signal<CurrentUser>({
    ...MOCK_USER,
    avatarUrl: this.readStoredAvatar(),
  });

  readonly user = this.userState.asReadonly();

  readonly initials = computed(() => {
    const name = this.userState().displayName.trim();

    if (!name) {
      return 'US';
    }

    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  });

  readonly isSuperAdmin = computed(
    () => this.userState().role === 'SUPER_ADMIN',
  );

  updateProfile(
    changes: Partial<
      Pick<
        CurrentUser,
        | 'displayName'
        | 'username'
        | 'email'
        | 'roleLabel'
        | 'location'
        | 'bio'
      >
    >,
  ): void {
    this.userState.update((currentUser) => ({
      ...currentUser,
      ...changes,
    }));
  }

  saveAvatar(avatarDataUrl: string): void {
    try {
      localStorage.setItem(this.avatarStorageKey, avatarDataUrl);

      this.userState.update((currentUser) => ({
        ...currentUser,
        avatarUrl: avatarDataUrl,
      }));
    } catch {
      throw new Error(
        'No se ha podido guardar la fotografía en el navegador.',
      );
    }
  }

  removeAvatar(): void {
    localStorage.removeItem(this.avatarStorageKey);

    this.userState.update((currentUser) => ({
      ...currentUser,
      avatarUrl: null,
    }));
  }

  loadAuthenticatedUser(user: CurrentUser): void {
    this.userState.set({
      ...user,
      avatarUrl: user.avatarUrl ?? this.readStoredAvatar(),
    });
  }

  clearAuthenticatedUser(): void {
    localStorage.removeItem(this.avatarStorageKey);
    this.userState.set(MOCK_USER);
  }

  private readStoredAvatar(): string | null {
    try {
      return localStorage.getItem(this.avatarStorageKey);
    } catch {
      return null;
    }
  }
}