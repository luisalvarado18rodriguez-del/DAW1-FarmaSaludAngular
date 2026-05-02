import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule 
  ]
  
  
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
  console.log("CLICK REGISTRO");
  console.log("VALID:", this.registroForm.valid);
  console.log(this.registroForm.value);

  if (this.registroForm.valid) {
    this.authService.registrar(this.registroForm.value).subscribe({
      next: () => {
        alert('OK');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error(err)
    });
  }
}
}