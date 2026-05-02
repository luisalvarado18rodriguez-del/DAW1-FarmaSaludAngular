import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentoService } from '../../core/services/medicamento-service';
import { ReservaService } from '../../core/services/reserva.service';
import { AuthService } from '../../core/services/auth-service';
import { Medicamento } from '../../core/models/Medicamento';
import { ReservaRequest } from '../../core/models/Reserva';

@Component({
  selector: 'app-catalogo-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './catalogo-cliente.html',
  styleUrl: './catalogo-cliente.css'
})
export class CatalogoCliente implements OnInit {
  listaMedicamentos: Medicamento[] = [];
  carrito: any[] = [];

  constructor(
    private medicamentoService: MedicamentoService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.medicamentoService.listar().subscribe({
      next: (data) => {
        this.listaMedicamentos = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error("Error al cargar medicamentos:", err)
    });
  }

  agregarAlCarrito(m: Medicamento, cantidadInput: HTMLInputElement): void {
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad <= 0) {
      alert("La cantidad debe ser mayor a 0");
      return;
    }
    if (cantidad > m.stock) {
      alert(`Solo hay ${m.stock} unidades disponibles`);
      return;
    }

    const existe = this.carrito.find(i => i.idMedicamento === m.idMedicamento);
    
    if (existe) {
      const nuevaCantidad = existe.cantidad + cantidad;
      if (nuevaCantidad > m.stock) {
        alert("No puedes agregar más del stock disponible");
        return;
      }
      existe.cantidad = nuevaCantidad;
    } else {
      this.carrito.push({
        idMedicamento: m.idMedicamento,
        nombre: m.nombre,
        precio: m.precio,
        cantidad: cantidad,
        requiereReceta: m.recetaMedica,
        archivoSeleccionado: null
      });
    }

    cantidadInput.value = '1';
    this.cd.detectChanges();
  }

  // ESTA ES LA FUNCIÓN QUE FALTABA
  eliminarDelCarrito(index: number): void {
    this.carrito.splice(index, 1);
    this.cd.detectChanges();
  }

  onFileSelected(event: any, item: any): void {
    const file = event.target.files[0];
    if (file) { 
      item.archivoSeleccionado = file; 
      this.cd.detectChanges();
    }
  }

  finalizarReserva(): void {
    // Validación: que el usuario esté logueado
    const idUsuario = this.authService.getUserId();
    if (idUsuario === 0) {
      alert("Error: No se pudo identificar al usuario. Inicie sesión nuevamente.");
      return;
    }

    // Validación: archivos de receta obligatorios
    for (const item of this.carrito) {
      if (item.requiereReceta && !item.archivoSeleccionado) {
        alert(`Debe adjuntar la receta para: ${item.nombre}`);
        return;
      }
    }

    const request: ReservaRequest = {
      idUsuario: idUsuario,
      detalles: this.carrito.map(i => ({
        idMedicamento: i.idMedicamento,
        cantidad: i.cantidad
      }))
    };

    const archivos = this.carrito
      .filter(i => i.requiereReceta)
      .map(i => i.archivoSeleccionado);

    this.reservaService.crear(request, archivos).subscribe({
      next: () => {
        alert("Reserva confirmada con éxito");
        this.carrito = [];
        this.cargarMedicamentos();
      },
      error: (err) => {
        console.error("Error en reserva:", err);
        alert("Error al reservar: " + (err.error?.message || err.message));
      }
    });
  }
}