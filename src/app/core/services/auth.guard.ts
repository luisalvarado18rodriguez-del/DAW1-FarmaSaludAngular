import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('user_role');

  // Si no hay rol, mandarlo al login
  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  // Verificar si la ruta requiere un rol específico (definido en app.routes.ts)
  const expectedRole = route.data['role'];

  if (expectedRole && userRole.toUpperCase() !== expectedRole.toUpperCase()) {
    console.warn("Acceso denegado: Rol insuficiente");
    router.navigate(['/dashboard']); // Si es CLIENTE e intenta entrar a ADMIN, lo mandamos al inicio
    return false;
  }

  return true;
};