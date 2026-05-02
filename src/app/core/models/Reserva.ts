export interface DetalleReservaRequest {
  idMedicamento: number;
  cantidad: number;
  // No incluimos rutaReceta aquí porque el archivo viaja aparte
}

export interface ReservaRequest {
  idUsuario: number;
  detalles: DetalleReservaRequest[];
}

export interface DetalleReservaResponse {
  idDetalle: number;
  nombreMedicamento: string;
  cantidad: number;
  precioUnitario: number;
  rutaReceta: string;
  subtotal: number;
}

export interface ReservaResponse {
  idReserva: number;
  idUsuario: number;
  nombreUsuario: string;
  fechaCreacion: string;
  fechaExpiracion: string;
  estado: string;
  detalles: DetalleReservaResponse[];
}