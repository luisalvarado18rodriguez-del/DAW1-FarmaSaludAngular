import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/UsuarioService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login { 
  
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
      next: (response: any) => { // :any mata el error TS7006
        console.log("Login exitoso", response);
        localStorage.setItem('usuarioLogueado', JSON.stringify(response));
        this.router.navigate(['/dashboard']); 
      },
      error: (err: any) => { // :any mata el error TS7006
        console.error("Error en login", err);
        alert("Usuario o clave incorrectos.");
      }
    });
  }
}