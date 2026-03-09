import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/user/pages/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/pages/dashboard/dashboard.component';
import { SettingsComponent } from './components/admin/pages/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path:'',component:UserComponent,children:[
        {path:"",component:HomeComponent},
        {path:"Home",component:HomeComponent},
    
        // {path:"contact",component:ContactComponent},
  
    ]},
   {
    path: 'Admin',
    component: AdminComponent,
    children: [
        { path: '', component: DashboardComponent },
        { path: 'Dashboard', component: DashboardComponent },
        { path: 'users', component: SettingsComponent },
        { path: 'farmers', component: SettingsComponent },
        { path: 'products', component: SettingsComponent },
        { path: 'orders', component: SettingsComponent },
        { path: 'reports', component: SettingsComponent },
        { path: 'settings', component: SettingsComponent }

    ]
},

    {path:"**",component:NotFoundComponent}
];
