import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AVAILABLE_OPERATORS, operatorLabels } from '@common/pipes/filter.pipe'
import { IFilter } from '@common/models/Filters.model'
import { replaceUnderscoresWithSpaces } from '@common/models/Products.model'
import { MatSelectChange } from '@angular/material/select'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() columns?: string[] = []
  @Input() appliedFilters?: IFilter[] = []
  @Output() filtersApplied$ = new EventEmitter<any>()
  operators = AVAILABLE_OPERATORS
  filterForm?: FormGroup
  operatorLabels = operatorLabels
  filtersList?: IFilter[] = []

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      column: ['', Validators.required],
      operator: ['', Validators.required],
      value: ['', Validators.required],
    })
  }

  /**
   * It will make sure to capitalize first letter of each word in string
   * @param string
   */
  capitalize(string: string): string {
    /**
     * It will match any word boundary (string starting with any lowercase letter between a word character and non-word
     * character or position (start/end of string))
     */
    const lowercaseWordBoundaryMatchRegex = /\b([a-zÁ-ú]{3,})/g
    return replaceUnderscoresWithSpaces(string.replace(lowercaseWordBoundaryMatchRegex, (w) => w.charAt(0).toUpperCase() + w.slice(1)))
  }

  /**
   * It will add filter to the filters list. Once user adds all filters, this filters list wil lbe used to filter
   * the content that matches selected filters
   * @param $event
   */
  addFilter($event: any) {
    if (!this.filterForm?.valid) {
      return
    }

    this.filtersList?.push({
      column: this.filterForm?.get('column')?.value,
      operator: this.filterForm?.get('operator')?.value,
      value: this.filterForm?.get('value')?.value,
    })
    this.filterForm?.reset()
  }

  resetFilters(): void {
    this.filtersList = []
    this.filtersApplied$.emit(null)
  }

  /**
   * It will remove matching filter from filtersList
   * @param filter
   */
  remove(filter: IFilter) {
    this.filtersList = this.filtersList?.filter((value) => {
      return value !== filter
    })
  }

  applyFilters(): void {
    if (this.filtersList?.length) {
      this.filtersApplied$.emit(JSON.stringify([...this.filtersList, ...(this.appliedFilters || [])]))
      this.filtersList = []
    }
  }

  /**
   * It would be great to make sure to validate form the good as we can, so we will not allow string as value for
   * numerical operators such as greater than, less than...
   * @param event
   */
  updateValueValidators(event: MatSelectChange) {
    const numericalColumns = ['price', 'id', 'gtin']
    if (
      numericalColumns.includes(this.filterForm?.get('column')?.value) &&
      (this.filterForm?.get('operator')?.value !== 3 || this.filterForm?.get('operator')?.value !== 2)
    ) {
      this.filterForm?.get('value')?.setValidators([Validators.required, Validators.pattern(/\d/)])
    } else {
      this.filterForm?.get('value')?.setValidators([Validators.required])
    }
    this.filterForm?.get('value')?.updateValueAndValidity()
  }
}
