import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MessagesService } from '../utilities/services/messages.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items?: MenuItem[] | undefined;

  constructor(
    private authService: AuthService,
    private messagesService: MessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Panel',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-user',
            routerLink: '/users',
          },
          {
            label: 'Groups',
            icon: 'pi pi-users',
            routerLink: '/groups',
          },
        ]
      },

      {
        label: 'Profile',
        items: [
          {
            label: 'My profile',
            icon: 'pi pi-user-edit',
            routerLink: '/user',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => { this.logout(); },
            url: '/login',
          },
        ]
      }
    ];
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-user',
        routerLink: '/users',
      },
      {
        label: 'Groups',
        icon: 'pi pi-users',
        routerLink: '/groups',
      },
      {
        label: 'My profile',
        icon: 'pi pi-user-edit',
        routerLink: '/user',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => { this.logout(); },
      },

    ];

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.messagesService.info('Logged out of the app!');

  }

}
