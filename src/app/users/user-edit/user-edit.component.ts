import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { MessagesService } from '../../utilities/services/messages.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, OnDestroy {
  @Input() userId?: number;
  @Output() done = new EventEmitter<boolean>();
  user: User | null = null;
  serviceSubscription?: Subscription;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private messagesService: MessagesService,
  ) {
  }

  ngOnInit(): void {
    const subscription = this.userId ? this.usersService.getById(this.userId)
      .subscribe(user => {
        this.user = user;
        this.form.addControl('id', new FormControl(this.userId));
        this.form.setValue({ id: user.id, email: user.email, password: null });
        subscription?.unsubscribe();
      }) : null;

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.min(3)]],
    });

    if (!this.userId) this.form.get('password')?.addValidators(Validators.required);
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }

  onCancel() {
    this.done.emit(false);
  }

  onConfirm() {
    if (this.form.valid) {
      if (this.userId)
        this.serviceSubscription = this.usersService.update(this.form.value).subscribe({
          next: () => {
            this.done.emit(true);
            this.messagesService.success('The user has been updated.');
          },
          error: (err) => {
            this.done.emit(false);
            // TODO: return the message for production
            // throw new Error(err.message);
            throw new Error(err.name + ': ' + err.error.message);
          }
        });

      else
        this.serviceSubscription = this.usersService.add(this.form.value).subscribe({
          next: () => {
            this.done.emit(true);
            this.messagesService.success('The user has been added.');
          },
          error: (err) => {
            this.done.emit(false);
            // TODO: return the message for production
            // throw new Error(err.message);
            throw new Error(err.name + ': ' + err.error.message);
          }
        });

    }
  }

}
