import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '@features/products/models/product';
import { ProductService } from '@services/product/product.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
    standalone: true,
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrl: './product-create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
    ],
})
export class ProductCreateComponent {
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private snackBar: MatSnackBar
    ) { }


    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            price: [0, [Validators.required, this.positiveNumberValidator()]],
        });
    }

    save() {
        if (this.form.valid) {
            const product: Product = { ...this.form.value, id: Date.now() };
            this.productService.addProduct(product);
            this.snackBar.open('Producto agregado', 'Cerrar', { duration: 3000 });
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
        }
    }

    positiveNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            return value != null && value >= 0 ? null : { negativeNumber: true };
        };
    }

}
