import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthGuard } from './app/guards/auth.guard';
import { AuthService } from './app/services/auth.service';
import { GarageService } from './app/services/garage.service';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(), AuthGuard, AuthService, GarageService],
}).catch((err) => console.error(err));
