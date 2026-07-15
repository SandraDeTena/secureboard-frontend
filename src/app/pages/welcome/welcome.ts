import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  private readonly router = inject(Router);

  readonly authMode = signal<AuthMode>('login');
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);
  readonly isSubmitting = signal(false);
  readonly statusMessage = signal('');
  readonly errorMessage = signal('');

  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');
  readonly displayName = signal('');

  readonly failedAttempts = signal(0);
  readonly lockRemainingSeconds = signal(0);

  private lockTimer: ReturnType<typeof setInterval> | null = null;

  readonly passwordStrength = computed(() => {
    const value = this.password();
    let score = 0;

    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    return score;
  });

  readonly passwordStrengthLabel = computed(() => {
    const score = this.passwordStrength();

    if (score <= 1) return 'Muy débil';
    if (score === 2) return 'Débil';
    if (score === 3) return 'Aceptable';
    if (score === 4) return 'Fuerte';
    return 'Muy fuerte';
  });

  readonly canSubmit = computed(() => {
    if (this.isSubmitting() || this.lockRemainingSeconds() > 0) {
      return false;
    }

    if (!this.isValidEmail(this.email())) {
      return false;
    }

    if (!this.isValidPassword(this.password())) {
      return false;
    }

    if (this.authMode() === 'register') {
      return (
        this.displayName().trim().length >= 3 &&
        this.password() === this.confirmPassword()
      );
    }

    return true;
  });

  setMode(mode: AuthMode): void {
    this.authMode.set(mode);
    this.clearMessages();
    this.password.set('');
    this.confirmPassword.set('');
  }

  updateEmail(value: string): void {
    this.email.set(value.trim().slice(0, 160));
    this.clearMessages();
  }

  updatePassword(value: string): void {
    this.password.set(value.slice(0, 128));
    this.clearMessages();
  }

  updateConfirmPassword(value: string): void {
    this.confirmPassword.set(value.slice(0, 128));
    this.clearMessages();
  }

  updateDisplayName(value: string): void {
    this.displayName.set(value.slice(0, 80));
    this.clearMessages();
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((current) => !current);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((current) => !current);
  }

  submit(): void {
    this.clearMessages();

    if (!this.canSubmit()) {
      this.errorMessage.set('Revisa los campos obligatorios antes de continuar.');
      return;
    }

    this.isSubmitting.set(true);

    window.setTimeout(() => {
      this.isSubmitting.set(false);

      if (this.authMode() === 'register') {
        this.statusMessage.set(
          'Cuenta preparada. Cuando conectemos Spring Boot, enviaremos un correo de verificación antes de permitir el acceso.',
        );
        return;
      }

      // Maqueta frontend: no guarda contraseñas ni tokens.
      this.router.navigateByUrl('/dashboard');
    }, 700);
  }

  signInWithGoogle(): void {
    this.clearMessages();
    this.statusMessage.set(
      'El botón está preparado visualmente. La autenticación real con Google se conectará mediante OAuth 2.0 / OpenID Connect en Spring Boot.',
    );
  }

  forgotPassword(): void {
    this.clearMessages();

    if (!this.isValidEmail(this.email())) {
      this.errorMessage.set(
        'Introduce primero un correo válido para solicitar el restablecimiento.',
      );
      return;
    }

    this.statusMessage.set(
      'Cuando conectemos el backend, se enviará un enlace de un solo uso al correo indicado.',
    );
  }

  useGuestMode(): void {
    this.clearMessages();
    this.statusMessage.set(
      'El acceso como invitado puede mantenerse solo para demostración, con permisos limitados y sin datos personales.',
    );
  }

  registerFailedAttempt(): void {
    const attempts = this.failedAttempts() + 1;
    this.failedAttempts.set(attempts);

    if (attempts >= 5) {
      this.startTemporaryLock();
    }
  }

  private startTemporaryLock(): void {
    this.lockRemainingSeconds.set(30);
    this.errorMessage.set(
      'Demasiados intentos. Acceso bloqueado temporalmente durante 30 segundos.',
    );

    if (this.lockTimer) {
      clearInterval(this.lockTimer);
    }

    this.lockTimer = setInterval(() => {
      const remaining = this.lockRemainingSeconds() - 1;
      this.lockRemainingSeconds.set(Math.max(remaining, 0));

      if (remaining <= 0) {
        if (this.lockTimer) {
          clearInterval(this.lockTimer);
          this.lockTimer = null;
        }

        this.failedAttempts.set(0);
        this.clearMessages();
      }
    }, 1000);
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  private isValidPassword(value: string): boolean {
    return (
      value.length >= 10 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /\d/.test(value) &&
      /[^A-Za-z0-9]/.test(value)
    );
  }

  private clearMessages(): void {
    this.statusMessage.set('');
    this.errorMessage.set('');
  }
}