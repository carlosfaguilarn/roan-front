// Importar los módulos de AngularJs
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

// Importar los Componentes varios
import { ServiciosComponent } from "./components/servicios/servicios.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { PresupuestosComponent } from "./components/presupuestos/presupuestos.component";
import { ProyectosComponent } from "./components/proyectos/proyectos.component";
import { GestionComponent } from "./components/gestion/gestion.component";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { PublicidadComponent } from "./components/publicidad/publicidad.component";
import { AdminUsuariosComponent } from "./components/admin-usuarios/admin-usuarios.component";
import { VerPresupuestosComponent } from "./components/ver-presupuestos/ver-presupuestos.component";


//Guard
import { AdminGuard } from '../services/admin.guard';


// Array de rutas
const adminRoutes: Routes = [
	{
		path:'admin',
		//component: MainComponent,
		canActivate: [AdminGuard],
		children: [
			{path: 'servicios', component: ServiciosComponent},
			{path: 'usuarios', component: UsuariosComponent},
			{path: 'presupuestos', component: PresupuestosComponent},
			{path: 'proyectos', component: ProyectosComponent},
			{path: 'gestionar/:id', component: GestionComponent},
            {path: 'clientes', component: ClientesComponent},
			{path: 'publicidad', component: PublicidadComponent},
			{path: 'admin-usuarios', component: AdminUsuariosComponent},
			{path: 'ver-presupuestos', component: VerPresupuestosComponent},
            {path: '**', component: ServiciosComponent}
		]
	}
];

// Decorador para configuración el módulo
@NgModule({
	imports:[
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})

// Exportar la clase de AdminRoutingModule
export class AdminRoutingModule{}