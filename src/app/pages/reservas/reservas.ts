import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentoService } from '../../core/services/medicamento-service';
import { ReservaService } from '../../core/services/reserva.service';
import { Medicamento } from '../../core/models/Medicamento';
import { ReservaRequest } from '../../core/models/Reserva';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    DecimalPipe
  ], 
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})
export class Reservas implements OnInit {
  
  listaMedicamentos: Medicamento[] = [];
  carrito: any[] = [];

  constructor(
    private medicamentoService: MedicamentoService,
    private reservaService: ReservaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.medicamentoService.listar().subscribe({
      next: (data) => {
        console.log('Medicamentos recibidos en Reservas:', data);
        // Usamos el operador spread para asegurar una nueva referencia de memoria
        this.listaMedicamentos = [...data]; 
        // Forzamos a Angular a actualizar la vista inmediatamente
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error al cargar medicamentos', err)
    });
  }

  agregarAlCarrito(med: Medicamento): void {
    const itemExiste = this.carrito.find(item => item.idMedicamento === med.idMedicamento);
    
    if (itemExiste) {
      itemExiste.cantidad++;
    } else {
      this.carrito.push({
        idMedicamento: med.idMedicamento,
        nombre: med.nombre,
        precio: med.precio,
        cantidad: 1,
        requiereReceta: med.recetaMedica,
        archivoSeleccionado: null
      });
    }
    this.cdr.detectChanges();
  }

  onFileSelected(event: any, item: any): void {
    const file: File = event.target.files[0];
    if (file) {
      item.archivoSeleccionado = file;
      this.cdr.detectChanges();
    }
  }

  eliminarDelCarrito(index: number): void {
    this.carrito.splice(index, 1);
    this.cdr.detectChanges();
  }

  finalizarReserva(): void {
    // Validar recetas obligatorias
    for (const item of this.carrito) {
      if (item.requiereReceta && !item.archivoSeleccionado) {
        alert(`Debe adjuntar la receta para: ${item.nombre}`);
        return;
      }
    }

    const reservaRequest: ReservaRequest = {
      idUsuario: 2, // ID de prueba exitosa
      detalles: this.carrito.map(item => ({
        idMedicamento: item.idMedicamento,
        cantidad: item.cantidad
      }))
    };

    const archivosAEnviar = this.carrito
      .filter(item => item.requiereReceta)
      .map(item => item.archivoSeleccionado);

    this.reservaService.crear(reservaRequest, archivosAEnviar).subscribe({
      next: (res) => {
        alert('Reserva creada con éxito. ID: ' + res.idReserva);
        this.carrito = [];
        this.cargarMedicamentos(); // Recargar para actualizar stock en vista
      },
      error: (err) => alert('Error: ' + (err.error?.message || err.message))
    });
  }
}