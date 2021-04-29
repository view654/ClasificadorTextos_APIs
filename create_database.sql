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


CREATE TABLE   IF NOT EXISTS `viviendas` (
  `link` varchar(100) NOT NULL,
  `vivienda_ID` int (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `lugar` varchar(100) NOT NULL,
  `precio` int (100) NOT NULL,
  `habitaciones` varchar(100) NOT NULL,
  `metros2` varchar(100) NOT NULL,
  `planta` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `compr_alq_compar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE  IF NOT EXISTS `trabajos`(
  `titulo` varchar(100),
  `trabajo_ID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `localidad` varchar(100) ,
  `enlace` varchar(100) NOT NULL,
  `jornada`  varchar(100) NOT NULL,
  `contrato`  varchar(100) NOT NULL,
  `salario`  varchar(100) NOT NULL,
  `experiencia`  varchar(100) NOT NULL,
  `funciones`  varchar(100) NOT NULL,
  `requisitos`  varchar(100) NOT NULL,
  `ofrece`  varchar(100) NOT NULL,
  `area`  varchar(100) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE   IF NOT EXISTS `Users_Viviendas`(
  `user_ID` int (11) NOT NULL,
  `vivienda_ID` int (11) NOT NULL,
  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `usuarios`(`user_ID`),
  CONSTRAINT `vivienda_ID` FOREIGN KEY (`vivienda_ID`) REFERENCES `viviendas`(`vivienda_ID`),
  UNIQUE (`user_ID`, `vivienda_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE   IF NOT EXISTS `Users_Trabajos`(
  `user_ID` int (11) NOT NULL,
  `trabajo_ID` int (11) NOT NULL,
  FOREIGN KEY (`user_ID`) REFERENCES `usuarios`(`user_ID`),
  FOREIGN KEY (`trabajo_ID`) REFERENCES `trabajos`(`trabajo_ID`),
  UNIQUE (`user_ID`, `trabajo_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
