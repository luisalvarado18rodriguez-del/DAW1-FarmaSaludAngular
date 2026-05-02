/// de la base de datos este recibe 
export interface Usuario {
  idUsuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  rol: string;
}

//este recibe los datos del formulario y lo envia a spring donde se guarda en la base de datos, por eso tiene el password
export interface UsuarioRequest {
  username: string;
  password: string; // Solo aquí
  nombres: string;
  apellidos: string;
  rol: string;
}