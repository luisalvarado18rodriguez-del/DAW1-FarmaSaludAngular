import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ReservaService } from '../../core/services/reserva.service';
import { ReservaResponse } from '../../core/models/Reserva';

@Component({
  selector: 'app-gestion-reservas',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './gestion-reservas.html',
  styleUrl: './gestion-reservas.css'
})
export class GestionReservas implements OnInit {
  listaReservas: ReservaResponse[] = [];

  constructor(
    private reservaService: ReservaService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTodas();
  }

  cargarTodas(): void {
    this.reservaService.listar().subscribe({
      next: (data) => {
        this.listaReservas = data;
        this.cd.detectChanges();
      }
    });
  }

  cambiarEstado(id: number, nuevoEstado: string): void {
    this.reservaService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        alert("Estado actualizado");
        this.cargarTodas();
      }
    });
  }

  verReceta(nombreArchivo: string): void {
    if (nombreArchivo) {
      window.open(`http://localhost:8080/uploads/recetas/${nombreArchivo}`, '_blank');
    } else {
      alert("Esta reserva no incluye receta física.");
    }
  }
  // ... dentro de la clase GestionReservas

calcularTotal(detalles: any[]): number {
  return detalles.reduce((acc, det) => acc + (det.precioUnitario * det.cantidad), 0);
}
}