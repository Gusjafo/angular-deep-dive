import { Injectable } from '@angular/core';
import { Product } from '@features/products/models/product';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private _products = new BehaviorSubject<Product[]>([
        { id: 1, name: 'Producto A', price: 100 },
        { id: 2, name: 'Producto B', price: 200 },
        { id: 3, name: 'Producto C', price: 250 },
        { id: 4, name: 'Producto D', price: 100 },
    ]);

    getProducts(): Observable<any[]> {
        return this._products.asObservable();
    }

    addProduct(product: Product) {
        const current = this._products.value;
        this._products.next([...current, product]);
    }

    deleteProduct(id: number) {
        const current = this._products.value;
        this._products.next(current.filter(p => p.id !== id));
    }
}
