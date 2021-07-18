export class Item {
  id: number = 0;
  itemName: string = '';
  itemRoute: string = '';
  iconCode: string = '';

  constructor(
    id?: number,
    itemName?: string,
    iconCode?: string,
    itemRoute?: string
  ) {
    if (id && iconCode && itemName && itemRoute) {
      this.id = id;
      this.iconCode = iconCode;
      this.itemName = itemName;
      this.itemRoute = itemRoute;
    }
  }
}
