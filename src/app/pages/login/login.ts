import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../core/services/UsuarioService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule  
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})



export class Login { 

  debugClick() {
  console.log('CLICK LINK REGISTRO');
}
  
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService 
  ) {}

  onLogin() {
  this._usuarioService.login(this.credentials).subscribe({
    next: (response: any) => { 
      console.log("Login exitoso", response);
      
      // 1. Guardamos el objeto completo (por si lo necesitas luego)
      localStorage.setItem('usuarioLogueado', JSON.stringify(response));
      
      // 2. EXTRAEMOS EL ROL y lo guardamos con la llave que usa el Navbar
      // Asegúrate de que 'response.rol' sea el nombre correcto que viene de tu Java
      if (response && response.rol) {
        localStorage.setItem('user_role', response.rol); 
      }

      // 3. Navegamos al dashboard
      this.router.navigate(['/dashboard']).then(() => {
        // Forzamos un refresco rápido para que el Navbar detecte el cambio de storage
        window.location.reload(); 
      });
    },
    error: (err: any) => {
      console.error("Error en login", err);
      alert("Usuario o clave incorrectos.");
    }
    


  });
  
}
}