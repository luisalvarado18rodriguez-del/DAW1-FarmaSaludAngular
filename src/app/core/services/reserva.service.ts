import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaRequest, ReservaResponse } from '../models/Reserva';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) { }

crear(reserva: ReservaRequest, archivos: File[]): Observable<ReservaResponse> {
  const formData = new FormData();

  // Es fundamental definir el tipo 'application/json' para que el Backend lo mapee al DTO correctamente
  const blob = new Blob([JSON.stringify(reserva)], { type: 'application/json' });
  formData.append('reserva', blob);

  // Solo agregamos archivos si existen en el arreglo
  if (archivos && archivos.length > 0) {
    archivos.forEach(archivo => {
      formData.append('archivos', archivo);
    });
  }

  return this.http.post<ReservaResponse>(this.apiUrl, formData);
}

  listar(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(this.apiUrl);
  }
  listarPorUsuario(idUsuario: number): Observable<ReservaResponse[]> {
  return this.http.get<ReservaResponse[]>(`${this.apiUrl}/usuario/${idUsuario}`);
}
}