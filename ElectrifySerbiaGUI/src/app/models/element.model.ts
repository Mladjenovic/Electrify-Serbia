export class Element {
  type: string = '';
  id: number = 0;
  name: string = '';
  address: string = '';
  x: string = '';
  y: string = '';
  version: number = 0;

  constructor(
    id?: number,
    name?: string,
    type?: string,
    address?: string,
    x?: string,
    y?: string
  ) {
    if (id && type && address && x && y && name) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.address = address;
      this.x = x;
      this.y = y;
    }
  }
}
