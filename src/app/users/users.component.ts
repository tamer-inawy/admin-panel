import { Component } from '@angular/core';
import { User } from './user.model';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { RoleComponent } from '../roles/role/role.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { GroupsService } from '../groups/groups.service';
import { Group } from '../groups/group.model';
import { RolesDirective } from '../auth/directives/roles.directive';
import { TooltipModule } from 'primeng/tooltip';
import { RoleEditComponent } from '../roles/role-edit/role-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    RouterLink,
    RoleComponent,
    RolesDirective,
    RoleEditComponent,
    UserEditComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  usersServiceSubscription: Subscription;
  groups: Group[] = [];
  groupsServiceSubscription: Subscription;
  isAddingUser = false;
  isAddingRole = false;
  selectedUserId = -1;

  constructor(
    private usersService: UsersService,
    private groupsService: GroupsService,
  ) {
    this.usersServiceSubscription = this.usersService.getAll().subscribe(users => {
      this.users = users;
    });

    this.groupsServiceSubscription = this.groupsService.groups$.subscribe(groups => {
      this.groups = groups;
    });

  }

  onAddingRole(userId: number) {
    this.isAddingRole = true;
    this.selectedUserId = userId;
  }

  onCloseAddingRole(isSuccessful: boolean) {
    this.isAddingRole = false;
    if(isSuccessful) {
      this.usersService.getAll().subscribe(users => {
        this.users = users;
      });
    }
    this.selectedUserId = -1;
  }

  onAddingUser() {
    this.isAddingUser = true;
  }

  onCloseAddingUser(isSuccessful: boolean) {
    this.isAddingUser = false;
    if(isSuccessful) {
      const subscription = this.usersService.getAll().subscribe(users => {
        this.users = users;
        subscription.unsubscribe();
      });
    }
    this.selectedUserId = -1;
  }

}
