import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '../auth.service';
import { MessagesService } from '../../utilities/services/messages.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formTitle = 'Login';
  isLoading = false;
  authServiceSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService,
  ) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedin) this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.authServiceSubscription?.unsubscribe();
  }

  login() {
    const val = this.form.value;
    this.isLoading = true;

    this.authServiceSubscription = this.authService.login(val.email, val.password)
      .subscribe({
        next: user => {
          if (user)
            this.messagesService.success({
              severity: 'success',
              detail: `Logged in successfully as ${user.email}`,
            });
          else throw new Error();

          this.isLoading = false;
          this.router.navigateByUrl('/');
        },
        error: err => {
          this.isLoading = false;
          throw new Error(err.message)
        }
      });

  }

}
