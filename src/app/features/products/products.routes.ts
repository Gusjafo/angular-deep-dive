import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        component: ProductListComponent,
    },
    {
        path: 'create',
        component: ProductCreateComponent,
    },
];
