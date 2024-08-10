import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ThemeComponent implements OnInit, OnDestroy {
  themeButtonLable!: string;
  themeButtonIcon!: string;
  themeButtonTip!: string;
  serviceSubscription!: Subscription;
  isFollowingOs = true;

  constructor(
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.isFollowingOs = this.themeService.isFollowingOs;

    this.themeService.theme$.subscribe(_ => {
      this.themeButtonLable = this.themeService.opposit;
      this.themeButtonIcon = `pi ${this.themeService.opposit === 'dark' ? 'pi-moon' : 'pi-sun'}`;
      this.themeButtonTip = `Switch to ${this.themeService.opposit}`;
    });

  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

  onSwitchTheme() {
    this.themeService.switchTheme(this.themeService.opposit);
    this.isFollowingOs = false;
  }

  onFollowOs() {
    this.themeService.followOs();
    this.isFollowingOs = true;
  }
}
