import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsAllComponent } from './notifications-all/notifications-all.component';
import { NotificationsErrorsComponent } from './notifications-errors/notifications-errors.component';
import { NotificationsInfoComponent } from './notifications-info/notifications-info.component';
import { NotificationsSuccessComponent } from './notifications-success/notifications-success.component';
import { NotificationsUnreadComponent } from './notifications-unread/notifications-unread.component';
import { NotificationsWarningComponent } from './notifications-warning/notifications-warning.component';
import { NotificationsComponent } from './notifications.component';

const routes: Routes = [
  {
    path: '', component: NotificationsComponent, children: [
      {
        path: 'warnings', component: NotificationsWarningComponent
      },
      {
        path: 'errors', component: NotificationsErrorsComponent
      },
      {
        path: 'unread', component: NotificationsUnreadComponent
      },
      {
        path: 'info', component: NotificationsInfoComponent
      },
      {
        path: 'success', component: NotificationsSuccessComponent
      },
      {
        path: 'all', component: NotificationsAllComponent
      }
      // { path: 'balance', loadChildren: () => import(`./balance/balance.module`).then(m => m.BalanceModule) },
      // {
      //   path: '', redirectTo: 'apply', pathMatch: 'full'
      // },
      // { path: '**', component: Page404leavesComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
