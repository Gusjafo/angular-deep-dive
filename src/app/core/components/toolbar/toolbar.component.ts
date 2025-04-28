import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@core/services/theme.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterModule,
        AsyncPipe,
        NgIf,
        CommonModule,
        MatIconModule,
    ],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    isDarkTheme$;
    rotating = false;

    constructor(private themeService: ThemeService) {
        this.isDarkTheme$ = this.themeService.isDarkTheme$;
    }

    toggleTheme() {
        this.rotating = true;
        setTimeout(() => {
            this.rotating = false;
        }, 1500); 
        this.themeService.toggleTheme();
    }

}
