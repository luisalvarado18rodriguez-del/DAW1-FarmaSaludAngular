import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Agregado ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentoService } from '../../core/services/medicamento-service';
import { CategoriaService } from '../../core/services/categoria-service';
import { Medicamento } from '../../core/models/Medicamento';
import { Categoria } from '../../core/models/Categoria';

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicamentos.html',
  styleUrl: './medicamentos.css',
})
export class Medicamentos implements OnInit {

  listaMedicamentos: Medicamento[] = [];
  listaCategorias: Categoria[] = [];
  editando: boolean = false;
  mostrarModal: boolean = false;
  esDetalle: boolean = false;


  nuevoMedicamento = {
    idMedicamento: undefined as number | undefined,
    nombre: '',
    precio: 0,
    stock: 0,
    fechaVencimiento: '',
    recetaMedica: false,
    idCategoria: 0

  };

  constructor(
    private medicamentoService: MedicamentoService,
    private categoriaService: CategoriaService,
    private cd: ChangeDetectorRef // 2. Inyectado para refrescar la vista
  ) { }

  ngOnInit(): void {
    console.log("Componente Medicamentos iniciado");
    this.cargarCategorias();
    this.cargarMedicamentos();
  }

  cargarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        this.cd.detectChanges();
      },
      error: (e) => console.error("Error al cargar categorías:", e)
    });
  }

  cargarMedicamentos(): void {
    this.medicamentoService.listar().subscribe({
      next: (data) => {
        console.log("Medicamentos recibidos:", data);
        this.listaMedicamentos = data;
        // 3. Forzamos la detección de cambios para que la tabla se pinte
        setTimeout(() => this.cd.detectChanges(), 100);
      },
      error: (e) => console.error("Error al listar medicamentos:", e)
    });
  }

  registrar(): void {
    if (this.nuevoMedicamento.idCategoria === 0) {
      alert("Por favor selecciona una categoría");
      return;
    }

    if (this.editando && this.nuevoMedicamento.idMedicamento) {
      // Lógica de Actualización
      this.medicamentoService.actualizar(this.nuevoMedicamento.idMedicamento, this.nuevoMedicamento as any).subscribe({
        next: () => {
          alert("Medicamento actualizado con éxito");
          this.finalizarOperacion();
        }
      });
    } else {
      // Lógica de Registro nuevo
      this.medicamentoService.registrar(this.nuevoMedicamento as any).subscribe({
        next: () => {
          alert("Medicamento registrado con éxito");
          this.finalizarOperacion();
        }
      });
    }
  }

  // Método auxiliar para no repetir código
  finalizarOperacion() {
    this.cargarMedicamentos();
    this.limpiarForm();
    this.editando = false;
    this.mostrarModal = false;
    this.cd.detectChanges();
  }

  limpiarForm() {
    this.nuevoMedicamento = {
      idMedicamento: undefined as number | undefined,
      nombre: '',
      precio: 0,
      stock: 0,
      fechaVencimiento: '',
      recetaMedica: false,
      idCategoria: 0
    };
  }

  eliminar(id: number | undefined): void {
    if (!id) return; // Validación de seguridad

    if (confirm('¿Está seguro de que desea eliminar este medicamento?')) {
      this.medicamentoService.eliminar(id).subscribe({
        next: () => {
          this.cargarMedicamentos();
          this.cd.detectChanges();
        },
        error: (e) => console.error("Error al eliminar:", e)
      });
    }
  }


  // Función para Detalle (puedes usar un modal o un alert por ahora)
  verDetalle(m: Medicamento): void {
    this.editando = false;
    this.esDetalle = true;

    const idCat = m.idCategoria || m.categoria?.idCategoria || 0;

    this.nuevoMedicamento = {
      ...m,
      idCategoria: idCat
    } as any;

    this.mostrarModal = true;
    this.cd.detectChanges();
  }

  // Función para cargar los datos en el formulario para editar
  prepararEdicion(m: Medicamento): void {
    this.editando = true;
    this.esDetalle = false;

    // Prioridad 1: idCategoria directo. 
    // Prioridad 2: id dentro del objeto categoria.
    const idEncontrado = m.idCategoria || (m as any).categoria?.idCategoria || 0;
    const idCat = m.idCategoria || m.categoria?.idCategoria || 0;

    this.nuevoMedicamento = {
      idMedicamento: m.idMedicamento,
      nombre: m.nombre,
      precio: m.precio,
      stock: m.stock,
      fechaVencimiento: m.fechaVencimiento,
      recetaMedica: m.recetaMedica,
      idCategoria: idCat
    };

    this.mostrarModal = true;
    this.cd.detectChanges();
    console.log("ID del Medicamento:", idEncontrado, "Lista de IDs disponibles:", this.listaCategorias.map(c => c.idCategoria));
  }



  descartarCambios(): void {
    this.editando = false;
    this.mostrarModal = false;
    this.limpiarForm();
  }

  abrirModal() {
    this.editando = false;
    this.esDetalle = false;
    this.limpiarForm();
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false;
    this.limpiarForm();
  }
  compararCategorias(o1: any, o2: any): boolean {
    // Si alguno es nulo o indefinido, no hay coincidencia
    if (o1 === null || o1 === undefined || o2 === null || o2 === undefined) {
      return false;
    }
    // Forzamos a ambos a ser números para evitar errores de tipo (string vs number)
    return Number(o1) === Number(o2);
  }
}

