import { Injectable, signal } from '@angular/core';

export interface StoredAuthUser {
  userId: number;
  displayName: string;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly tokenKey = 'secureboard_access_token';
  private readonly userKey = 'secureboard_authenticated_user';

  readonly authenticatedUser = signal<StoredAuthUser | null>(
    this.readUser()
  );

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  saveSession(
    accessToken: string,
    user: StoredAuthUser
  ): void {
    sessionStorage.setItem(this.tokenKey, accessToken);
    sessionStorage.setItem(
      this.userKey,
      JSON.stringify(user)
    );

    this.authenticatedUser.set(user);
  }

  clearSession(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this.authenticatedUser.set(null);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getAccessToken());
  }

  private readUser(): StoredAuthUser | null {
    const rawUser = sessionStorage.getItem(this.userKey);

    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as StoredAuthUser;
    } catch {
      sessionStorage.removeItem(this.userKey);
      return null;
    }
  }
}