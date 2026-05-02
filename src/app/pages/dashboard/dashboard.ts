import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // 1. Agregado ChangeDetectorRef
import { CommonModule } from '@angular/common'; // 2. Agregado para directivas base
import { RouterLink } from '@angular/router';
import { MedicamentoService } from '../../core/services/medicamento-service';
import { Medicamento } from '../../core/models/Medicamento';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink], // 3. Importante incluir CommonModule
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  listaMedicamentos: Medicamento[] = [];
  private sub?: Subscription;

  constructor(
    private medicamentoService: MedicamentoService,
    private cd: ChangeDetectorRef // 4. Inyectado para forzar el renderizado
  ) {}

  ngOnInit() {
    this.cargarMedicamentos();
  }

  cargarMedicamentos() {
    console.log("Iniciando carga de medicamentos...");
    this.sub = this.medicamentoService.listar().subscribe({
      next: (data: Medicamento[]) => {
        if (data && data.length > 0) {
          // Tomamos los primeros 4 y forzamos la actualización
          this.listaMedicamentos = data.slice(0, 4);
          console.log("Datos recibidos:", this.listaMedicamentos);
          
          // Esto soluciona que los datos "aparezcan y se vayan"
          this.cd.markForCheck(); 
          setTimeout(() => this.cd.detectChanges(), 100); 
        }
      },
      error: (err) => {
        console.error("Error crítico en Dashboard:", err);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}