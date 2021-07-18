export class NotificationDocumentSettings {
  enabledInfoNotif: boolean = false;
  enabledSuccNotif: boolean = false;
  enabledWarnNotif: boolean = false;
  enabledErroNotif: boolean = false;
  enabledShowHide: boolean = false;

  constructor(
    enabledInfoNotif?: boolean,
    enabledSuccNotif?: boolean,
    enabledWarnNotif?: boolean,
    enabledErroNotif?: boolean,
    enabledShowHide?: boolean
  ) {
    if (
      enabledInfoNotif &&
      enabledSuccNotif &&
      enabledWarnNotif &&
      enabledErroNotif &&
      enabledShowHide
    ) {
      this.enabledInfoNotif = enabledInfoNotif;
      this.enabledSuccNotif = enabledSuccNotif;
      this.enabledWarnNotif = enabledWarnNotif;
      this.enabledErroNotif = enabledErroNotif;
      this.enabledShowHide = enabledShowHide;
    }
  }
}
