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

    // Convertimos el objeto reserva a un Blob JSON
    const json = JSON.stringify(reserva);
    const blob = new Blob([json], { type: 'application/json' });
    
    formData.append('reserva', blob);

    // Agregamos todos los archivos de recetas
    archivos.forEach(archivo => {
      formData.append('archivos', archivo);
    });

    return this.http.post<ReservaResponse>(this.apiUrl, formData);
  }

  listar(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(this.apiUrl);
  }
}