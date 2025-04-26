import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const THEME_KEY = 'isDarkTheme';

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

    toggleTheme() {
        const newTheme = !this._isDarkTheme.value;
        this._isDarkTheme.next(newTheme);
        localStorage.setItem(THEME_KEY, newTheme.toString());

        if (newTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
}
