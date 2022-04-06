import { Component, OnDestroy, OnInit } from '@angular/core'
import { ProductsService } from '@app/products/products.service'
import { distinctUntilChanged, filter, finalize, Subscription, take } from 'rxjs'
import { IProduct, IProducts, replaceUnderscoresWithSpaces } from '@common/models/Products.model'
import { MatTableDataSource } from '@angular/material/table'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute, Router } from '@angular/router'
import { IRouteParams } from '@common/models/RouteParams.model'
import { APP_ROUTES } from '@common/constants/app.constants'
import { IFilter } from '@common/models/Filters.model'
import { FilterPipe } from '@common/pipes/filter.pipe'

const DEFAULT_PAGE_SIZE = 10

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [FilterPipe],
})
export class ProductsComponent implements OnInit, OnDestroy {
  /**
   * Stores data fetched from the API
   */
  data?: IProducts
  filteredData?: IProduct[]
  /**
   * Stores list of columns that will be used for table columns
   */
  displayedColumns?: string[] = []
  /**
   * Stores an actual data source for the mat table
   */
  dataSource?: MatTableDataSource<IProduct>
  pageIndex: number = 0
  previousPageIndex: number = 0
  itemsPerPage: number = DEFAULT_PAGE_SIZE
  totalProducts: number = 0
  loading?: boolean = true
  filtersList?: IFilter[]
  formatObjectKey = replaceUnderscoresWithSpaces
  private subscriptions = new Subscription()

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit(): void {
    this.readRouteParams()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  /**
   * This will set all variables based on route params. I would like to have a shareable URLs, so this will help to keep
   * things in sync
   * @private
   */
  private readRouteParams(): void {
    const routeSubscription = this.activatedRoute.queryParams
      .pipe(
        filter((queryParams) => !!queryParams),
        distinctUntilChanged()
      )
      .subscribe((params: IRouteParams) => {
        this.loading = true
        this.pageIndex = params.page || 0
        this.itemsPerPage = params.pageSize || DEFAULT_PAGE_SIZE
        this.filtersList = params.filtersList ? JSON.parse(params.filtersList) : undefined
        // Now that we have all variables set, let's fetch the products
        this.fetchProducts()
      })
    this.subscriptions.add(routeSubscription)
  }

  /**
   * It will fetch list of products from the API
   * @private
   */
  private fetchProducts(): void {
    this.productsService
      .fetchProducts()
      .pipe(take(1))
      .pipe(
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe((rsp) => {
        this.data = rsp
        this.displayedColumns = this.data?.keys
        this.filteredData = this.filterPipe.transform(this.data?.data, this.filtersList)
        this.totalProducts = this.filteredData?.length || 0
        this.setPaginationAndDataSource()
      })
  }

  /**
   * It will set data for mat paginator, and it will slice the response to display get corresponding data for
   * current page
   * @private
   */
  private setPaginationAndDataSource(): void {
    const sliceEnd = this.pageIndex > 0 ? this.itemsPerPage * this.pageIndex + this.itemsPerPage : 10
    this.totalProducts = this.filteredData?.length || 0
    this.dataSource = new MatTableDataSource(this.filteredData?.slice(this.itemsPerPage * this.pageIndex, sliceEnd))
  }

  /**
   * It will handle logic to load a new page on each pagination change event. This will enable us to navigate between
   * the pages
   * @param event
   */
  onPaginateChange(event: PageEvent) {
    this.setQueryParam({ page: event.pageIndex })
  }

  /**
   * The method that sets and merges query params
   * @param params
   * @private
   */
  private setQueryParam(params: IRouteParams): void {
    // const urlSegment = this.activeItem ? 'details' : 'overview';
    const url = `/${APP_ROUTES.products}`
    this.router.navigate([url], {
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    })
  }

  /**
   * It will add filtersList to route query params
   * @param filtersList
   */
  applyFilters(filtersList: string): void {
    this.setQueryParam({ filtersList, page: 0 })
  }
}
