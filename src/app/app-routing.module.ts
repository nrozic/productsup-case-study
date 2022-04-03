import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { APP_ROUTES } from '@common//constants/app.constants'

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${APP_ROUTES.products}`,
    pathMatch: 'full',
  },
  {
    path: `${APP_ROUTES.products}`,
    loadChildren: (): Promise<any> => import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: '**',
    redirectTo: `/${APP_ROUTES.notFound}`,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
