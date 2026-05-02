import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth.guard';

import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Medicamentos } from './pages/medicamentos/medicamentos';
import { Reservas } from './pages/reservas/reservas';
import { Usuarios } from './pages/usuarios/usuarios';
import { RegistroComponent } from './pages/registro/registro';
import { CatalogoCliente } from './pages/catalogo-cliente/catalogo-cliente';
import { MisReservas } from './pages/reservas/mis-reservas';
import { GestionReservas } from './pages/reservas/gestion-reservas';

export const routes: Routes = [

  // 🔓 PÚBLICAS
  { path: 'login', component: Login },
  { path: 'registro', component: RegistroComponent },

  // 🔒 PRIVADAS
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [authGuard] 
  },

  { 
    path: 'medicamentos', 
    component: Medicamentos, 
    canActivate: [authGuard], 
    data: { role: 'ADMIN' } 
  },

  { 
    path: 'usuarios', 
    component: Usuarios, 
    canActivate: [authGuard], 
    data: { role: 'ADMIN' } 
  },

  { 
    path: 'reservas', 
    component: Reservas, 
    canActivate: [authGuard], 
    data: { role: 'ADMIN' } 
  },
  { 
  path: 'catalogo', 
  component: CatalogoCliente, 
  canActivate: [authGuard], 
  data: { role: 'CLIENTE' }
  },
  { path: 'mis-reservas', 
    component: MisReservas, 
    canActivate: [authGuard], 
    data: { role: 'CLIENTE' } 
  },
  { 
  path: 'gestion-reservas', 
  component: GestionReservas, 
  canActivate: [authGuard], 
  data: { role: 'ADMIN' } 
  },

 
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];