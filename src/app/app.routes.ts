import { Routes } from '@angular/router';
import { Usuarios } from './pages/usuarios/usuarios';
import { Medicamentos } from './pages/medicamentos/medicamentos';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
export const routes: Routes = [
{ path: 'usuarios', component: Usuarios }, // Ruta usuarios xddd
{path: 'medicamentos', component: Medicamentos},
{ path: 'dashboard', component: Dashboard },
{ path: 'login', component: Login },
{ path: 'registro', component: RegistroComponent },
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

];
