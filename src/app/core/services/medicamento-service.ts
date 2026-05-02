import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento, MedicamentoRequest } from '../models/Medicamento';

@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  private apiUrl = 'http://localhost:8080/api/medicamentos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl);
  }
  registrar(med: MedicamentoRequest, archivo: File): Observable<Medicamento> {
  const formData = new FormData();
  
  const json = JSON.stringify(med);
  const blob = new Blob([json], { type: 'application/json' });
  formData.append('medicamento', blob);
  formData.append('archivo', archivo);

  // NO PASES HEADERS AQUÍ, deja que Angular/Browser lo haga solo
  return this.http.post<Medicamento>(this.apiUrl, formData);
}
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 actualizar(id: number, medicamento: any, archivo?: File | null) {
  const formData = new FormData();

  // Enviar el JSON como Blob
  formData.append('medicamento', new Blob(
    [JSON.stringify(medicamento)],
    { type: 'application/json' }
  ));

  // Enviar archivo SOLO si existe
  if (archivo) {
    formData.append('archivo', archivo);
  }

  return this.http.put(`${this.apiUrl}/${id}`, formData);
}
}