export class HistoryInfo {
  id: number = 0;
  email: string = '';
  state: string = '';
  date: string = '';
  constructor(email: string, state: string, date: string) {
    this.email = email;
    this.state = state;
    this.date = date;
  }
}
