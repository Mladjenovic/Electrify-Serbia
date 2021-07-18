export class Street {
  id: number = 0;
  name: string = '';
  priority: number = 0;

  constructor(id?: number, name?: string, priority?: number) {
    if (id && name && priority) {
      this.id = id;
      this.name = name;
      this.priority = priority;
    }
  }
}
