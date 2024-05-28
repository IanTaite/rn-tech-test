import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@services';
import { LoginPanelComponent } from '@components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginPanelComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  loginError = signal<string>('');

  onLogin(args: { username: string, password: string }) {
    const { username, password } = args;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
    this.authService.login(username, password).subscribe({
      next: () => this.router.navigateByUrl(returnUrl),
      error: () => this.loginError.set('Invalid credentials')
    });
  }
  onCancel() {
    this.router.navigateByUrl('/');
  }
}
