/**
 * This class enables us to dynamically set all values for object propertues in model classes
 * When model extends this class we can call deserialize method and save ourselves from manually
 * setting value to each property
 */
export class Deserialize {
  protected deserialize(input: any): any {
    Object.assign(this, input)
    return this
  }
}
