import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Agrégalo aquí
  
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Definimos los campos que Spring espera recibir
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required]
    });
  }

  enviarRegistro() {
    if (this.registroForm.valid) {
      this.authService.registrar(this.registroForm.value).subscribe({
        next: (response) => {
          console.log('Usuario creado con éxito:', response);
          alert('¡Registro completado! Ahora inicia sesión.');
          this.router.navigate(['/login']); // Lo mandamos al login
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Hubo un error al registrar el usuario.');
        }
      });
    }
  }
}