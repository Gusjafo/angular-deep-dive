import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const THEME_KEY = 'isDarkTheme';
const DARK_CLASS = 'dark-theme';
const TRANSITION_LIGHT_TO_DARK = 'transition-light-to-dark';
const TRANSITION_DARK_TO_LIGHT = 'transition-dark-to-light';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private _isDarkTheme = new BehaviorSubject<boolean>(false);
    isDarkTheme$ = this._isDarkTheme.asObservable();

    constructor() {
        const storedTheme = localStorage.getItem(THEME_KEY);
        const isDark = storedTheme === 'true';
        this._isDarkTheme.next(isDark);

        if (isDark) {
            document.body.classList.add('dark-theme');
        }
    }

    toggleTheme(): void {
        const newTheme = !this._isDarkTheme.value;
        this._isDarkTheme.next(newTheme);

        this.applyTheme(newTheme);

        localStorage.setItem(THEME_KEY, newTheme.toString());
    }

    private applyTheme(isDark: boolean): void {
        if (isDark) {
            this.switchTheme(DARK_CLASS, TRANSITION_LIGHT_TO_DARK);
        } else {
            this.switchTheme('', TRANSITION_DARK_TO_LIGHT);
        }
    }

    private switchTheme(darkClass: string, transitionClass: string): void {
        if (darkClass) {
            document.body.classList.add(darkClass);
        } else {
            document.body.classList.remove(DARK_CLASS);
        }

        document.body.classList.add(transitionClass);
        setTimeout(() => {
            document.body.classList.remove(transitionClass);
        }, 500);
    }

}
