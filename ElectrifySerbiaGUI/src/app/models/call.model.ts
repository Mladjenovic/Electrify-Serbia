import { User } from './user.model';

export class Call {
  id: number = 0;
  reason: string = '';
  hazard: string = '';
  comment: string = '';
  name: string = 'Unknown';
  surName: string = 'Unknown';
  address: string = '';
  priority: number = 0;

  constructor(
    id: number,
    reason: string,
    hazard: string,
    comment: string,
    address: string,
    name?: string,
    surName?: string,
    priority?: number
  ) {
    this.id = id;
    this.reason = reason;
    this.hazard = hazard;
    this.comment = comment;
    this.address = address;
    if (name && surName && priority) {
      this.name = name;
      this.priority = priority;
      this.surName = surName;
    }
  }
}
