import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductsComponent } from '@app/products/products.component'
import { ProductsRoutingModule } from '@app/products/products-routing.module'
import { MatGridListModule } from '@angular/material/grid-list'
import { SidebarModule } from '@common/sidebar/sidebar.module'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SidebarModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
})
export class ProductsModule {}
