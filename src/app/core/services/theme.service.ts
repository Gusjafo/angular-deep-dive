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

        if (newTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.add('transition-light-to-dark');
            setTimeout(() => {
                document.body.classList.remove('transition-light-to-dark');
            }, 500);
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('transition-dark-to-light');
            setTimeout(() => {
                document.body.classList.remove('transition-dark-to-light');
            }, 500);
        }

        localStorage.setItem('isDarkTheme', newTheme.toString());
    }

}
