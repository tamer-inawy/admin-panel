import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { GroupsComponent } from './groups/groups.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'users',
    loadComponent: () => UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadComponent: () => UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:id',
    loadComponent: () => UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'groups',
    loadComponent: () => GroupsComponent,
    canActivate: [AuthGuard],
  },
];
