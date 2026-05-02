export interface ReservaResponse {
  idReserva: number;
  fechaCreacion: string;
  estado: string;
  username: string; // <--- AGREGA ESTA LÍNEA
  detalles: DetalleReservaResponse[];
}

export interface DetalleReservaResponse {
  idDetalle: number;
  idMedicamento: number;
  nombreMedicamento: string;
  cantidad: number;
  precioUnitario: number;
  rutaReceta: string;
}

export interface ReservaRequest {
  idUsuario: number;
  detalles: {
    idMedicamento: number;
    cantidad: number;
  }[];
}