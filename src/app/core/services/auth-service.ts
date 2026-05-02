import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioRequest } from '../models/Usuario'; // Ajusta la ruta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Tu puerto de Spring Boot
  private URL_BASE = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  registrar(datos: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.URL_BASE, datos);
  }
}