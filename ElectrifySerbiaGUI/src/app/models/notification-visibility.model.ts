export class NotificationVisibility {
  id: number = 0;
  type: string = '';
  isVisible: boolean = true;

  constructor(id?: number, type?: string, isVisible?: boolean) {
    if (id && type && isVisible) {
      this.id = id;
      this.type = type;
      this.isVisible = isVisible;
    }
  }
}
