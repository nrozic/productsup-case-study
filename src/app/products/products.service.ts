import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { PRODUCTS } from '@common/mock-data/products'
import { IProducts } from '@common/models/Products.model'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  /**
   * Method that will simulate data fetching process, it returns an Observable just as the real http request would.
   * Based on the data source, I assume that the API would always return all products without the pagination
   */
  fetchProducts(): Observable<any> {
    return of(new IProducts(PRODUCTS))
  }
}
