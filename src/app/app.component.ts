import { Component,  } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { AuthService } from './auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { User } from './users/user.model';
import { Observable } from 'rxjs';
import { MessagesModule } from 'primeng/messages';
import { ThemeComponent } from './utilities/components/theme/theme.component';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    AsyncPipe,
    MessagesModule,
    ThemeComponent,
    FieldsetModule,
  ],
  // providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  fieldTitle = 'Pannel';
  user: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = authService.user$;
  }

  ngOnInit() {
    this.router.events.subscribe(
      event => {
        if(event instanceof NavigationEnd) {
          this.fieldTitle = event.url.split('/')[1] || 'Home';
        }
      }
    );
  }

}
