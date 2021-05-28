import { Usuario } from '../components/usuario_interfaz';
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import { Filtro } from '../components/filtro_interfaz';
import { Notificacion } from '../components/notificaciones';

export const variablesdeidentificacion = {

  user: <Usuario> null
  /*{
      ID:1,
      Nombre:"John",
      Apellidos:"Smith",
      Fecha_nacimiento:new Date(1980,4,4),        
      Email:"JohnSmith@gmail.com",
      Contraseña:"string",
      Sector:"Informatica",
      Estudios:"Ingenieria Informatica",
      Esperiencia_laboral:"Nop",
      Idiomas:["Español","Ingles","Italiano"]
  }*/,
  casas: <Casa[]> null,

  trabajos: <Trabajo[]> null,

  Notificaciones: <Notificacion[]>[
  {
    titulo:"Bienvenido a la familia de Rejob!",
    fecha:"08/05/2021",
    descripcion:"Notificación de bienvenida a los nuevos usuarios"
  }
  ],

  iniciarSesion(usuarioLogueado){
    this.user = usuarioLogueado;
    
    //console.log(this.user);
  },
  cerrarSesion(){
    this.user=null;
  },

  filtros: <Filtro>
    {
      Tprovincia: null,
      Tcontrato: null,
      Tjornada: null,
      viviendaPrecio: 1000
      //viviendaM: null
    },
  getjobs(trabajos){
    this.trabajos = trabajos;
  },
  getcasas(casas){
    this.casas = casas;
  }

  


};




