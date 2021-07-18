import { TeamMember } from './team-member.model';
import { User } from './user.model';

export class Crew {
  id: number = 0;
  name: string = '';
  members: TeamMember[] = [];
}
