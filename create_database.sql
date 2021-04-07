CREATE TABLE  IF NOT EXISTS `usuarios`(
  `user_ID` int (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fecha_nacimiento` date,
  `sector` varchar(100),
  `estudios` varchar(100),
  `experiencia_laboral` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE   IF NOT EXISTS `idiomas_usuario`(
  `user_ID` int (11) NOT NULL,
  `idioma` varchar (100) NOT NULL,

  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `usuarios`(`user_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE   IF NOT EXISTS `viviendas` (
  `link` varchar(100) NOT NULL,
  `vivienda_ID` int (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `lugar` varchar(100) NOT NULL,
  `precio` int (100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `compr_alq_compar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE  IF NOT EXISTS `trabajos`(
  `descripcion` varchar(100) NOT NULL,
  `numero_vacantes`  int(11),
  `trabajo_ID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `lugar` varchar(100) ,
  `empresa` varchar(100) NOT NULL,
  `salario`  int(8) NOT NULL,
  `link`  varchar(100) NOT NULL,
  `estudio_minimos`  varchar(100) NOT NULL,
  `experiencia_minima`  varchar(100) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `beneficios_sociales`varchar(100) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE   IF NOT EXISTS `Users_Viviendas`(
  `user_ID` int (11) NOT NULL,
  `vivienda_ID` int (11) NOT NULL,
  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `usuarios`(`user_ID`),
  CONSTRAINT `vivienda_ID` FOREIGN KEY (`vivienda_ID`) REFERENCES `usuarios`(`vivienda_ID`)

)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE   IF NOT EXISTS `Users_Trabajos`(
  `user_ID` int (11) NOT NULL,
  `trabajo_ID` int (11) NOT NULL,
  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `usuarios`(`user_ID`),
  CONSTRAINT `trabajo_ID` FOREIGN KEY (`trabajo_ID`) REFERENCES `usuarios`(`trabajo_ID`)

)ENGINE=InnoDB DEFAULT CHARSET=latin1;
