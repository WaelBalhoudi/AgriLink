import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/user/pages/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/pages/dashboard/dashboard.component';
import { SettingsComponent } from './components/admin/pages/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MarketplaceComponent } from './components/user/pages/marketplace/marketplace.component';
import { FarmersComponent } from './components/user/pages/farmers/farmers.component';
import { AgriServicesComponent } from './components/user/pages/agri-services/agri-services.component';
import { WeatherComponent } from './components/user/pages/weather/weather.component';
import { ContactComponent } from './components/user/pages/contact/contact.component';
import { FarmerProfileComponent } from './components/farmer-profile/farmer-profile.component';
import { FarmerDashboardComponent } from './components/farmer-profile/pages/farmer-dashboard/farmer-dashboard.component';
import { ProfileDetailsComponent } from './components/farmer-profile/pages/profile-details/profile-details.component';
import { CropsComponent } from './components/farmer-profile/pages/crops/crops.component';
import { ProductsComponent } from './components/farmer-profile/pages/products/products.component';
import { DiseaseDetectionHistoryComponent } from './components/farmer-profile/pages/disease-detection-history/disease-detection-history.component';
import { OrdersComponent } from './components/farmer-profile/pages/orders/orders.component';
import { ReviewsComponent } from './components/farmer-profile/pages/reviews/reviews.component';

export const routes: Routes = [
    {path:'',component:UserComponent,children:[
        {path:"",component:HomeComponent},
        {path:"Home",component:HomeComponent},
        {path:"Marketplace",component:MarketplaceComponent},
        {path:"Farmers",component:FarmersComponent},
        {path:"Agri-Services",component:AgriServicesComponent},
        {path:"Weather",component:WeatherComponent},
        {path:"Contact",component:ContactComponent},
    
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
{
    path: 'FarmerProfile',
    component: FarmerProfileComponent,
    children: [
        { path: '', component: DashboardComponent },
        { path: 'Dashboard', component: FarmerDashboardComponent },
        { path: 'ProfileDetails', component: ProfileDetailsComponent },
        { path: 'Crops', component: CropsComponent },
        { path: 'DetectionHistory ', component: DiseaseDetectionHistoryComponent },
        { path: 'Products', component: ProductsComponent },
        { path: 'Orders', component: OrdersComponent },
        { path: 'Reviews', component: ReviewsComponent },
        { path: 'Settings', component: SettingsComponent }

    ]
},

    {path:"**",component:NotFoundComponent}
];
