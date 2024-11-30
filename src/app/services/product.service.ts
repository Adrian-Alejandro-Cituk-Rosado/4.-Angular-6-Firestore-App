import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  constructor(private db: AngularFirestore) {
    this.productsCollection = db.collection<Product>('products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }

  addProduct(product: Product): Promise<DocumentReference> {
    return this.productsCollection.add(product);
  }

  updateProduct(product: Product): Promise<void> {
    return this.productsCollection.doc(product.id).update(product);
  }
}
