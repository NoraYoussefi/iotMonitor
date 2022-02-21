import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { GaugeModule } from 'angular-gauge';
import { Ng2GaugeModule } from 'ng2-gauge';
import { GaugeComponent } from './gauge/gauge.component';
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';

@NgModule({
  declarations: [AppComponent, GaugeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ChartsModule,
    GaugeModule.forRoot(),
    Ng2GaugeModule,
    CircularGaugeModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
