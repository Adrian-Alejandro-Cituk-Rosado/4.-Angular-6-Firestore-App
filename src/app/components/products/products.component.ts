import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  editingProductId: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  editProduct(product: Product): void {
    if (product.id) {
      this.editingProductId = product.id;
    }
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).then(() => {
      this.editingProductId = null;
      this.loadProducts();
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).then(() => {
      this.loadProducts(); // Recargar productos después de eliminar
    });
  }
}
