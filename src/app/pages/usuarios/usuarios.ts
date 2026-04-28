import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Usuario, UsuarioRequest } from '../../core/models/Usuario';
import { UsuarioService } from '../../core/services/UsuarioService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];
  mostrarModal: boolean = false;

  nuevoUsuario: UsuarioRequest = {
    username: '',
    password: '',
    nombres: '',
    apellidos: '',
    rol: 'CLIENTE'
  };

  constructor(
    private _usuarioService: UsuarioService, 
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  // --- LISTAR ---
  listarUsuarios(): void {
    this._usuarioService.listar().subscribe({
      next: (data: Usuario[]) => {
        console.log("Datos recibidos:", data);
        this.usuarios = data;
        
        setTimeout(() => {
          this.cd.detectChanges();
        }, 100);
      },
      error: (error) => console.error('Error al listar:', error)
    });
  }

  // --- REGISTRAR ---
  registrarUsuario(): void {
    this._usuarioService.registrar(this.nuevoUsuario).subscribe({
      next: () => {
        this.listarUsuarios(); 
        this.cerrarModal(); // Cerramos el modal tras éxito
      },
      error: (error) => console.error('Error al registrar:', error)
    });
  }

  
  eliminarUsuario(usuario: Usuario): void {
    if (confirm(`¿Estás seguro de eliminar al usuario ${usuario.username}?`)) {
      // Aquí asumo que tu servicio tiene un método eliminar(id)
      // this._usuarioService.eliminar(usuario.idUsuario).subscribe(...)
      console.log('Eliminando usuario:', usuario.idUsuario);
    }
  }

  
  editarUsuario(usuario: Usuario): void {
    console.log('Cargando datos para editar:', usuario);
    this.nuevoUsuario = {
      username: usuario.username,
      password: '', 
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      rol: usuario.rol
    };
    this.abrirModal();
  }

  // --- DETALLE (Nuevo) ---
  verDetalle(usuario: Usuario): void {
    alert(`Perfil de Usuario:\nNombre: ${usuario.nombres} ${usuario.apellidos}\nRol: ${usuario.rol}`);
  }

  // --- CONTROL DE MODAL ---
  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.limpiarFormulario();
    this.cd.detectChanges();
  }

  limpiarFormulario(): void {
    this.nuevoUsuario = {
      username: '',
      password: '',
      nombres: '',
      apellidos: '',
      rol: 'CLIENTE'
    };
  }
}