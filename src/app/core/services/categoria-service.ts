import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/categorias'; // Ajusta a tu ruta de Java

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}