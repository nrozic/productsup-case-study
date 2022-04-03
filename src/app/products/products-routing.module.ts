import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { APP_ROUTES } from '@common/constants/app.constants'
import { ProductsComponent } from '@app/products/products.component'

const routes: Routes = [
  {
    path: `${APP_ROUTES.root}`,
    component: ProductsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
