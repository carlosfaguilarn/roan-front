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
import { PerfilComponent } from "./components/perfil/perfil.component";

//Guard
import { AdminGuard } from '../services/admin.guard';
import { HasPermisionGuard } from '../services/hasPermision.guard';


// Array de rutas
const adminRoutes: Routes = [
	{
		path:'admin',
		//component: MainComponent,
		children: [
			{path: '', component: ProyectosComponent},
			{path:'servicios',component: ServiciosComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'view_services'}},
			{path:'usuarios', component: UsuariosComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'view_users'}},
			{path:'presupuestos', component: PresupuestosComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'view_budgets'}},
			{path:'proyectos', component: ProyectosComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'view_projects'}},
			{path:'gestionar/:id', component: GestionComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'add_projects'}},
            {path:'clientes', component: ClientesComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'view_clients'}},
			{path:'publicidad', component: PublicidadComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'add_ads'}},
			{path:'admin-usuarios', component: AdminUsuariosComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'manage_users'}},
			{path:'ver-presupuestos', component: VerPresupuestosComponent,canActivate:[HasPermisionGuard],data:{expectedPermission:'view_budgets'}},
			{path:'perfil', component: PerfilComponent},			
			{path:'**', component: ServiciosComponent}
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