import { Element } from '../models/element.model';
import { Call } from '../models/call.model';
import { Crew } from './crew.model';
import { Resolution } from './resolution.model';
import { Multimedia } from './multimedia.model';
export class Incident {
  id: number = 0;
  type: string = '';
  priority: number = 0;
  address: string = '';
  confirmed: boolean = false;
  status: string = 'Drafted';
  eta: string = '';
  ata: string = '';
  timeOfIncident: string = '';
  etr: string = '';
  calls: number = 0;
  voltage: number = 0;
  affectedConsumers: number = 0;
  sheduledTime: string = '';
  creator: string = '';
  elements: Element[] = [];
  call: Call[] = [];
  resolutions: Resolution[] = [];
  multimedia: Multimedia[] = [];
  crew: Crew = new Crew();
  version: number = 0;
}
