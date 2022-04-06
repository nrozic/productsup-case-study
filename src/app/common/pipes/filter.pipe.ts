import { Pipe, PipeTransform } from '@angular/core'
import { IFilter } from '@common/models/Filters.model'
import { IProduct } from '@common/models/Products.model'

export const AVAILABLE_OPERATORS = [0, 1, 2, 3]

export enum operatorLabels {
  'Less than',
  'Greater than',
  'Equals',
  'Contains',
}

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any[] | undefined, ...args: any): IProduct[] | undefined {
    if (!args || !args[0]) {
      return data
    }

    let filteredContent: any[] = []

    for (const filter of <IFilter[]>args[0]) {
      filteredContent = [
        ...filteredContent,
        ...(data?.filter((item) => {
          return checkCondition(item[filter.column])(filter.operator)(filter.value)
        }) || []),
      ]
    }
    return filteredContent
  }
}

/**
 * To make things DRY, more reusable and flexible we will use this as a helper function that will map operator methods
 * That way we can easily extend filters later on if required
 * @param a
 */
export const checkCondition = (a: any) => (operator: any) => (b: any) => {
  switch (operator) {
    case 0:
      return a < b
    case 1:
      return a > b
    case 2:
      return a == b
    case 3:
      return a.toString().includes(b.toString())
    default:
      console.error('Invalid operation')
      return 'Invalid operation'
  }
}
