import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { LoadingService } from '../../services/loading.service';
import { environment } from '../../../environments/environment';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { CommonModule } from '@angular/common';

//Importar módulos de Angular Material correctamente
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

// Pipe para truncar texto
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { StatusComponent } from '../../components/status/status.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    //LayoutComponent,
    SideMenuComponent,
    // ProductListComponent,
    //ProductTableComponent,
    StatusComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    TruncatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = [];
  terminoBusqueda: string = '';
  productosFiltrados: Product[] = [];
  inicio: number = 0;
  itemsPorPagina: number = 4; // Cantidad de tarjetas visibles

  constructor(
    private productService: ProductService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log(data);
        
        this.products = data;
        this.productosFiltrados = [...this.products]; 
      },
      error: (err) => console.error('Error al obtener productos:', err),
    });
  }

  siguiente(): void {
    if (this.inicio + this.itemsPorPagina < this.productosFiltrados.length) {
      this.inicio += this.itemsPorPagina;
    }
  }

  anterior(): void {
    if (this.inicio > 0) {
      this.inicio -= this.itemsPorPagina;
    }
  }

  filtrarProductos(termino: string): void {
    this.inicio = 0; // Reiniciar índice al filtrar
    this.productosFiltrados = this.products.filter(product =>
      product.category.name.toLowerCase().includes(termino.toLowerCase())
    );
  }
}


