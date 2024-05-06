import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { UpdateuserComponent } from './user/updateuser/updateuser.component';
import { ClientComponent } from './client/client.component';
import { AddclientComponent } from './client/addclient/addclient.component';
import { UpdateclientComponent } from './client/updateclient/updateclient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddexpenseComponent } from './dashboard/addexpense/addexpense.component';
import { UpdateexpenseComponent } from './dashboard/updateexpense/updateexpense.component';
import { adminguardGuard } from './core/guard/adminguard.guard';
import { userguardGuard } from './core/guard/userguard.guard';
import { backofficeguardGuard } from './core/guard/backofficeguard.guard';
import { PlaningComponent } from './planing/planing.component';
import { EmsComponent } from './ems/ems.component';
import { ListclientComponent } from './client/listclient/listclient.component';
import { ListuserComponent } from './user/listuser/listuser.component';
export const routes: Routes = [
  {
    path: 'ems',
    component: EmsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: 'update', component: UpdateexpenseComponent }
        ]
      },
                { path: 'addexpense', component: AddexpenseComponent },


      
      {
        path: 'client',
        component: ClientComponent,
        children: [
          {path :'',redirectTo:'/ems/client/list',pathMatch:'full'},
          { path: 'add', component: AddclientComponent },
          { path: 'update/:id', component: UpdateclientComponent },
          {path:'list', component: ListclientComponent}
        ]
      },
      {
        path: 'user',
        component: UserComponent,
        children: [
          {path :'',redirectTo:'/ems/user/list',pathMatch:'full'},
          { path: 'add', component: AdduserComponent },
          { path: 'update/:id', component: UpdateuserComponent },
          {path:'list', component: ListuserComponent}

        ]
      },
     { path: 'planing', component: PlaningComponent }
    ]
  },
  {path:'',redirectTo:'/ems',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/ems' },
];
