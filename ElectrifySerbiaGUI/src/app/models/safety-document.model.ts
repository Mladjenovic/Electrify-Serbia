import { Crew } from './crew.model';
import { Element } from './element.model';
import { HistoryInfo } from './history-info.model';
import { Multimedia } from './multimedia.model';
export class SafetyDocument {
  id: number = 0;
  type: string = '';
  switchingPlan: number = 0;
  status: string = 'Drafted';
  creator: string = '';
  crew: string = '';
  details: string = '';
  notes: string = '';
  phone: string = '';
  state: string = 'Drafted';
  history: HistoryInfo[] = [];
  date: string = '';
  elements: Element[] = [];
  multimedia: Multimedia[] = [];
  operationsComplited: boolean = false;
  tagsRemoved: boolean = false;
  groundingRemoved: boolean = false;
  readyForService: boolean = false;
  version: number = 0;
  constructor(
    id?: number,
    type?: string,
    plan?: number,
    creator?: string,
    crew?: string,
    details?: string,
    notes?: string,
    phone?: string,
    date?: string
  ) {
    if (
      id &&
      type &&
      plan &&
      creator &&
      crew &&
      details &&
      notes &&
      phone &&
      date
    ) {
      this.id = id;
      this.type = type;
      this.switchingPlan = plan;
      this.creator = creator;
      this.crew = crew;
      this.details = details;
      this.notes = notes;
      this.phone = phone;
      this.date = date;
      this.status = 'Drafted';
    }
  }
}
