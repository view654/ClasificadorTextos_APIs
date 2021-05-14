import { Usuario } from '../components/usuario_interfaz';
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import { Notificacion } from '../components/notificaciones'

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
  casas: <Casa[]>
  [
  {
    ID:1,
    Lugar:"Uno",
    Precio:200000000,
    Compr_alq_compar:"Alquilar",
    Tipo:"Adosado",
    Link:"hhh.hhhhhh.hh",
    M2:34,
    Descripcion:"",
    Telefono:678678678,
    Email:"email@email.com"
  },
  {
    ID:2,
    Lugar:"Tokyo",
    Precio:30000795,
    Compr_alq_compar:"Alquilar",
    Tipo:"Loft",
    Link:"hhh.hhhhhh.hh",
    M2:134,
    Descripcion:"La descripción de la propiedad es el paso definitivo para convencer al potencial comprador para realizar una oferta por tu casa o al potencial inquilino para marcar tu número e interesarse por el alquiler que ofreces.Las fotografías y el video importan mucho, muchísmo, pero la descripción de un inmueble es imprescindible para darle fuerza al contenido visual. Estos tres elementos se complementan y unidos causan un efecto mayor.",
    Telefono:654654654,
    Email:"emailT@emailT.com"
  },
  {
    ID:3,
    Lugar:"Uno",
    Precio:200000000,
    Compr_alq_compar:"Comprar",
    Tipo:"Adosado",
    Link:"hhh.hhhhhh.hh",
    M2:34,
    Descripcion:"",
    Telefono:678678678,
    Email:"email@email.com"
  },
  {
    ID:4,
    Lugar:"Uno",
    Precio:200000000,
    Compr_alq_compar:"Alquilar",
    Tipo:"Adosado",
    Link:"hhh.hhhhhh.hh",
    M2:34,
    Descripcion:"",
    Telefono:678678678,
    Email:"email@email.com"
  },
  {
    ID:2,
    Lugar:"Tokyo",
    Precio:30000795,
    Compr_alq_compar:"Alquilar",
    Tipo:"Loft",
    Link:"hhh.hhhhhh.hh",
    M2:134,
    Descripcion:"La descripción de la propiedad es el paso definitivo para convencer al potencial comprador para realizar una oferta por tu casa o al potencial inquilino para marcar tu número e interesarse por el alquiler que ofreces.Las fotografías y el video importan mucho, muchísmo, pero la descripción de un inmueble es imprescindible para darle fuerza al contenido visual. Estos tres elementos se complementan y unidos causan un efecto mayor.",
    Telefono:654654654,
    Email:"emailT@emailT.com"
  },
  {
    ID:3,
    Lugar:"Uno",
    Precio:200000000,
    Compr_alq_compar:"Comprar",
    Tipo:"Adosado",
    Link:"hhh.hhhhhh.hh",
    M2:34,
    Descripcion:"",
    Telefono:678678678,
    Email:"email@email.com"
  },
  {
    ID:2,
    Lugar:"Tokyo",
    Precio:30000795,
    Compr_alq_compar:"Alquilar",
    Tipo:"Loft",
    Link:"hhh.hhhhhh.hh",
    M2:134,
    Descripcion:"La descripción de la propiedad es el paso definitivo para convencer al potencial comprador para realizar una oferta por tu casa o al potencial inquilino para marcar tu número e interesarse por el alquiler que ofreces.Las fotografías y el video importan mucho, muchísmo, pero la descripción de un inmueble es imprescindible para darle fuerza al contenido visual. Estos tres elementos se complementan y unidos causan un efecto mayor.",
    Telefono:654654654,
    Email:"emailT@emailT.com"
  },
  {
    ID:3,
    Lugar:"Uno",
    Precio:200000000,
    Compr_alq_compar:"Comprar",
    Tipo:"Adosado",
    Link:"hhh.hhhhhh.hh",
    M2:34,
    Descripcion:"",
    Telefono:678678678,
    Email:"email@email.com"
  }
  ],
  trabajos: <Trabajo[]>[
  {
    ID:1,
    Titulo:"Distribuidor",
    Enlace:"",
    Jornada:"string",
    Contrato:"string",
    Salario:"string",
    Experiencia:"string",
    Funciones:"string",
    Requisitos:"string",
    Ofrece:"string",
    Area:"string",
    Localidad:"string"
  }
  ],
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
  }
};




