import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.scss'
})
export class LoginPanelComponent {
  errorMessage = input<string>('');
  @Output() login = new EventEmitter<{username: string, password: string}>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  onLogin_click() {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password?? '';
    this.login.emit({ username, password });
  }

  onCancel_click() {
    this.cancel.emit();
  }
}
