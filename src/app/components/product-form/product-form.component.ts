import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() productToEdit: Product | null = null;
  product: Product = {} as Product;  // Producto local (vacío por defecto)


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Si se recibe un producto para editar, cargar sus valores en el formulario
    if (this.productToEdit) {
      this.product = { ...this.productToEdit }; // Hacer una copia del producto para edición
    }
  }

  saveProduct(): void {
    if (this.product.name && this.product.description && this.product.price) {
      if (this.product.id) {
        // Si tiene id, actualizar el producto
        this.productService.updateProduct(this.product).then(() => {
          this.product = {} as Product;  // Limpiar el formulario
          this.productToEdit = null;  // Restablecer la variable de edición
        });
      } else {
        // Si no tiene id, agregar un nuevo producto
        this.productService.addProduct(this.product).then(() => {
          this.product = {} as Product;  // Limpiar el formulario
        });
      }
    } else {
      alert('Please fill out all fields.');
    }
  }
}
