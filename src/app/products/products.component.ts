import { Component, OnInit } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.fetchProducts()
  }

  private fetchProducts(): void {}
}
