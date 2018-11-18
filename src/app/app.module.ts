import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

//Importar el módulo de administración
import { AdminModule } from "./admin/admin.module";

// Componentes de la vista del cliente
import { NuestrosServiciosComponent } from "./components/nuestros-servicios/nuestros-servicios.component";
import { CotizacionesComponent } from "./components/cotizaciones/cotizaciones.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { LoginComponent } from "./components/login/login.component";


@NgModule({
  declarations: [
    AppComponent,
    NuestrosServiciosComponent,
    CotizacionesComponent,
    ContactoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    routing,
    AdminModule, //Módulo de administración
    ChartModule // add ChartModule to your imports
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }