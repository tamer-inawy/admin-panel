import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { BehaviorSubject } from 'rxjs';

type ThemeStr = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme$: BehaviorSubject<ThemeStr>;
  theme: ThemeStr;
  isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isFollowingOs = true;

  get opposit() {
    return this.theme === 'light' ? 'dark' : 'light';
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    const osTheme = this.getOsTheme();
    this.theme = (localStorage.getItem('theme') ?? osTheme) as ThemeStr;
    this.theme$ = new BehaviorSubject(this.theme);
    this.isFollowingOs = !localStorage.getItem('theme');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.isOsDark = event.matches;

      if (!localStorage.getItem('theme')) {
        this.theme = this.getOsTheme();
        this.loadTheme();
      }
    });

  }

  loadTheme() {
    const el = <HTMLLinkElement>this.document.getElementById('theme-style');

    if (el) {
      el.href = `theme-${this.theme}.css`;
    }
  }

  switchTheme(theme: ThemeStr) {
    this.theme = theme;
    this.theme$.next(this.theme);
    this.isFollowingOs = false;

    localStorage.setItem('theme', this.theme);

    this.loadTheme();
  }

  getOsTheme() {
    return this.isOsDark ? 'dark' : 'light';
  }

  followOs() {
    this.switchTheme(this.getOsTheme());
    localStorage.removeItem('theme');
    this.isFollowingOs = true;
  }
}
