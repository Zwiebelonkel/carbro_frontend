import { Routes } from '@angular/router';
import { ScanComponent } from './pages/scan/scan.component';
import { LoginComponent } from './pages/login/login.component';
import { GarageComponent } from './pages/garage/garage.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ScanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'garage', component: GarageComponent, canActivate: [AuthGuard] },
];
