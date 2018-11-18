// Módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';
// Componentes
import { ServiciosComponent } from "./components/servicios/servicios.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { PresupuestosComponent } from "./components/presupuestos/presupuestos.component";
import { ProyectosComponent } from "./components/proyectos/proyectos.component";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { PublicidadComponent } from "./components/publicidad/publicidad.component";
import { ChartArrowComponent } from "./components/charts/chart-arrow/chart-arrow.component";
import { ChartPieComponent } from "./components/charts/chart-pie/chart-pie.component";
import { ChartBarComponent } from "./components/charts/chart-bar/chart-bar.component";

// 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminUsuariosComponent } from './components/admin-usuarios/admin-usuarios.component';
// Guards
import { AdminGuard } from '../services/admin.guard'; 
import { SearchPipe } from './search.pipe';
import { MoneyPipe } from './money.pipe';
import { GestionComponent } from './components/gestion/gestion.component';
import { VerPresupuestosComponent } from './components/ver-presupuestos/ver-presupuestos.component';

@NgModule({
	declarations:[
		ServiciosComponent,
		UsuariosComponent,
		PresupuestosComponent,
		ProyectosComponent,
		ClientesComponent,
        PublicidadComponent,
        ChartArrowComponent,
        ChartPieComponent,
        ChartBarComponent,
		AdminUsuariosComponent,
		GestionComponent,
		SearchPipe,
		MoneyPipe,
		VerPresupuestosComponent
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpModule,
		AdminRoutingModule,
        BrowserAnimationsModule
	],
	exports:[
		ServiciosComponent,
		UsuariosComponent,
		PresupuestosComponent,
		ProyectosComponent,
		ClientesComponent,
		PublicidadComponent
	],
	providers:[ 
		AdminGuard
	]
})
export class AdminModule{}