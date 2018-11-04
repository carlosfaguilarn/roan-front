import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { NuestrosServiciosComponent } from "./components/nuestros-servicios/nuestros-servicios.component";
import { CotizacionesComponent } from "./components/cotizaciones/cotizaciones.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { LoginComponent } from "./components/login/login.component";


const appRoutes = [
  {path: '', component: NuestrosServiciosComponent},
  {path: 'nuestrosservicios', component: NuestrosServiciosComponent},
  {path: 'cotizaciones', component: CotizacionesComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'adminlog', component: LoginComponent},
  {path: '**', component: NuestrosServiciosComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
