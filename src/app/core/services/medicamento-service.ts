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

  registrar(med: MedicamentoRequest): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, med);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  actualizar(id: number, medicamento: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, medicamento);
}
}