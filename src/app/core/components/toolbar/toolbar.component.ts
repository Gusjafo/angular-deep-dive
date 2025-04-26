import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@core/services/theme.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterModule,
        AsyncPipe,
        NgIf,
    ],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    isDarkTheme$;

    constructor(private themeService: ThemeService) {
        this.isDarkTheme$ = this.themeService.isDarkTheme$;
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

}
