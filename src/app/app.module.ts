import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ScanComponent } from './pages/scan/scan.component'; // ✅ wichtig!

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent, // ✅ hier eintragen
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
