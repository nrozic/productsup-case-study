import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductsComponent } from '@app/products/products.component'
import { ProductsRoutingModule } from '@app/products/products-routing.module'
import { MatGridListModule } from '@angular/material/grid-list'
import { SidebarModule } from '@common/sidebar/sidebar.module'

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, SidebarModule, MatGridListModule],
})
export class ProductsModule {}
