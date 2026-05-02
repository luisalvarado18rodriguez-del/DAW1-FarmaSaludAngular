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
    RouterModule   // 🔥 ESTO ES LO QUE TE FALTA
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
      
      // 1. Guardamos los datos para que el catálogo los encuentre
      localStorage.setItem('user_role', response.rol); 
      localStorage.setItem('user_id', response.idUsuario.toString()); // 🔥 ESTA LÍNEA ES VITAL
      localStorage.setItem('user_name', response.nombres);
      localStorage.setItem('usuarioLogueado', JSON.stringify(response));

      // 2. Navegamos al catálogo o dashboard
      this.router.navigate(['/catalogo']).then(() => {
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