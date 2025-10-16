import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ScanComponent } from './pages/scan/scan.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, ScanComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}
