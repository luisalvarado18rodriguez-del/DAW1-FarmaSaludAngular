import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReservaService } from '../../core/services/reserva.service';
import { AuthService } from '../../core/services/auth-service';
import { ReservaResponse } from '../../core/models/Reserva';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css'
})
export class MisReservas implements OnInit {
  reservas: ReservaResponse[] = [];

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    if (id > 0) {
      this.reservaService.listarPorUsuario(id).subscribe({
        next: (data) => {
          this.reservas = data;
          this.cd.detectChanges();
        }
      });
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'status-pending';
      case 'ENTREGADO': return 'status-success';
      case 'REQUIERE_RECETA': return 'status-warning';
      default: return '';
    }
  }
}