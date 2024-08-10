import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user.model';
import { RoleComponent } from '../../roles/role/role.component';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { RolesDirective } from '../../auth/directives/roles.directive';
import { Roles } from '../../roles/roles.enum';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RoleComponent,
    UserEditComponent,
    RolesDirective,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user?: User;
  isProfile!: boolean;
  isEditingUser = false;
  readonly editAllowedRoles: Roles[] = [Roles.MANAGER];
  serviceSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.serviceSubscription = this.authService.user$.subscribe(user => {
      const currentUser = user!;

      this.route.params.subscribe(params => {
        if (params['id']) {
          this.serviceSubscription?.unsubscribe();

          this.serviceSubscription = this.usersService.getById(params['id']).subscribe(user => {

            this.user = (!user?.id || user.id === currentUser?.id) ? currentUser : user;
            this.serviceSubscription?.unsubscribe();
          });
        } else {
          this.user = currentUser;
        }
      });


    });

  }

  onEddingUser() {
    this.isEditingUser = true;
  }

  onCloseEditing(success: boolean) {
    this.isEditingUser = false;
    if(success && this.user?.id) {
      const subscription = this.usersService.getById(this.user.id).subscribe(user => {
        this.user = user;
        subscription.unsubscribe();
      });
    }
  }

}
