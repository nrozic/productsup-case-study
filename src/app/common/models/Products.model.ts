import { Deserialize } from '@common/models/Deserialize.model'

/**
 * Model for the product item
 */
export class IProduct extends Deserialize {
  id?: number
  gtin?: number
  product_name?: string
  product_desc?: string
  price?: number
  currency?: string
  category?: string
  gender?: string
  quantity?: number
  size?: string
  style?: string
  color?: string
  url?: string
  image?: string
  image_additional?: string
  additional?: string
  source_video?: string

  constructor(data: any) {
    super()
    this.deserialize(data)
  }
}

/**
 * Model for the products' response. We will be using this model to generate additional data that will be required later
 * on for the table
 */
export class IProducts extends Deserialize {
  data?: IProduct[]
  keys: any = []

  constructor(data: any) {
    super()
    const products = Object.entries(data)

    if (products?.length) {
      // Iterating the products list and initializing each item using the IProduct model class
      this.data = products.map((item) => {
        const product = <any>item[1]
        // Making sure to dynamically populate the array with the list of columns based on the data in the API response
        Object.keys(product).forEach((key) => {
          if (!this.keys.includes(key)) {
            this.keys.push(key)
          }
        })

        return product
      })
    }
  }
}

/**
 * It generates a formatted string based on object key. This can be handy if you need to use object key in table
 * headers, so product_price becomes price
 * @param key
 */
export function replaceUnderscoresWithSpaces(key: string): string {
  return key.replace('_', ' ')
}

/**
 * It rolls back formatted key string into key with underscores
 * @param key
 */
export function replaceSpacesWithUnderscores(key: string): string {
  return key.replace(' ', '_')
}
