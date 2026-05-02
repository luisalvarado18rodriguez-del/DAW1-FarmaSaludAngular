import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario, UsuarioRequest } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL_BASE = 'http://localhost:8080/api/usuarios';
  
  public currentUser = signal<any>(null);

  constructor(private http: HttpClient) { }

  // Método recuperado para el registro
  registrar(datos: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.URL_BASE, datos);
  }

  // Método para el inicio de sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.URL_BASE}/login`, credentials).pipe(
      tap(user => {
        localStorage.setItem('user_role', user.rol);
        localStorage.setItem('user_id', user.idUsuario.toString());
        localStorage.setItem('user_name', user.nombres);
        this.currentUser.set(user);
      })
    );
  }

  getUserId(): number {
    return Number(localStorage.getItem('user_id') || 0);
  }

  logout() {
    localStorage.clear();
    this.currentUser.set(null);
  }
}