import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '@services/product/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '@features/products/models/product';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatSnackBarModule],

})
export class ProductListComponent implements OnInit {
    products$!: Observable<Product[]>;

    constructor(
        private productService: ProductService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.products$ = this.productService.getProducts();
    }

    trackById(index: number, item: any) {
        return item.id;
    }

    delete(id: number) {
        if (confirm('¿Está seguro de eliminar el producto?')) {
            this.productService.deleteProduct(id);
            this.snackBar.open('Producto eliminado', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
            });
        }        
    }


}
