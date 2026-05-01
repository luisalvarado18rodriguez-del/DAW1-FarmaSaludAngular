import { Categoria } from './Categoria';

export interface Medicamento {
  idMedicamento: number; 
  nombre: string;
  precio: number;
  stock: number;
  fechaVencimiento: string; 
  recetaMedica: boolean;
  nombreCategoria: string;
  idCategoria?: number; // El ID que usas para el formulario
  categoria?: Categoria; // La entidad que viene del Backend
  rutaImagen: string;
  lote: string;
}

export interface MedicamentoRequest {
  nombre: string;
  precio: number;
  stock: number;
  fechaVencimiento: string;
  recetaMedica: boolean;
  idCategoria: number; /// El ID que pides en el RequestDto
}