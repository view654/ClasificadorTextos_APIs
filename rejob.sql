-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2021 a las 17:46:07
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rejob`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos`
--

CREATE TABLE `trabajos` (
  `descripcion` varchar(100) DEFAULT NULL,
  `numero_vacantes` int(11) DEFAULT NULL,
  `trabajo_ID` int(11) NOT NULL,
  `lugar` varchar(100) DEFAULT NULL,
  `empresa` varchar(100) NOT NULL,
  `salario` int(8) NOT NULL,
  `link` varchar(100) NOT NULL,
  `estudio_minimos` varchar(100) NOT NULL,
  `experiencia_minima` varchar(100) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `beneficios_sociales` varchar(100) NOT NULL,
  `idioma` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_trabajos`
--

CREATE TABLE `users_trabajos` (
  `user_ID` int(11) NOT NULL,
  `trabajo_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_viviendas`
--

CREATE TABLE `users_viviendas` (
  `user_ID` int(11) NOT NULL,
  `vivienda_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user_ID` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fecha_nacimiento` text DEFAULT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `estudios` varchar(100) DEFAULT NULL,
  `experiencia_laboral` varchar(100) DEFAULT NULL,
  `idiomas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user_ID`, `password`, `email`, `nombre`, `apellidos`, `fecha_nacimiento`, `sector`, `estudios`, `experiencia_laboral`, `idiomas`) VALUES
(1, '$2y$10$XnHcorGka.yGBnmn6sVxIusTR5t/ltO2UQKY1WgBDN.YWUM5geHmK', 'email@email.e', 'string', 'string string', '2021-04-15', 'sector', 'estudio de estudios', 'experiencia_laboral', 'Frances;Japones;'),
(2, '$2y$10$XnHcorGka.yGBnmn6sVxIusTR5t/ltO2UQKY1WgBDN.YWUM5geHmK', 'uno@dos.tres', 'VVVV', 'gggg', '2021-04-21', 'Robotica', 'ESO', '3 años', 'Español;Italiano;Aleman;'),
(3, '$2y$10$XnHcorGka.yGBnmn6sVxIusTR5t/ltO2UQKY1WgBDN.YWUM5geHmK', 'juan@gmail.com', 'Pedrito', 'Gonzalez', '1998-10-10', 'Ingeniería', 'Ingeniería Industrial', '5', 'Ingles;'),
(4, '$2y$10$XnHcorGka.yGBnmn6sVxIusTR5t/ltO2UQKY1WgBDN.YWUM5geHmK', 'patricia2291997@gmail.com', 'Patricia', 'dx', NULL, NULL, NULL, NULL, NULL),
(5, '$2y$10$j9V0ZSOwGKTrhQ5.drP55Ox7wVFbnLUMk1/m7vc99ukHp7NINkjTO', 'ddd@ddd.com', 'buscando a nemo', 'dx', '2020-12-07', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viviendas`
--

CREATE TABLE `viviendas` (
  `link` varchar(100) NOT NULL,
  `vivienda_ID` int(11) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `precio` int(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `compr_alq_compar` varchar(100) NOT NULL,
  `superficie` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  ADD PRIMARY KEY (`trabajo_ID`);

--
-- Indices de la tabla `users_trabajos`
--
ALTER TABLE `users_trabajos`
  ADD KEY `user_ID` (`user_ID`),
  ADD KEY `trabajo_ID` (`trabajo_ID`);

--
-- Indices de la tabla `users_viviendas`
--
ALTER TABLE `users_viviendas`
  ADD KEY `user_ID` (`user_ID`),
  ADD KEY `vivienda_ID` (`vivienda_ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user_ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `viviendas`
--
ALTER TABLE `viviendas`
  ADD PRIMARY KEY (`vivienda_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  MODIFY `trabajo_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `viviendas`
--
ALTER TABLE `viviendas`
  MODIFY `vivienda_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users_trabajos`
--
ALTER TABLE `users_trabajos`
  ADD CONSTRAINT `users_trabajos_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `usuarios` (`user_ID`),
  ADD CONSTRAINT `users_trabajos_ibfk_2` FOREIGN KEY (`trabajo_ID`) REFERENCES `trabajos` (`trabajo_ID`);

--
-- Filtros para la tabla `users_viviendas`
--
ALTER TABLE `users_viviendas`
  ADD CONSTRAINT `users_viviendas_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `usuarios` (`user_ID`),
  ADD CONSTRAINT `users_viviendas_ibfk_2` FOREIGN KEY (`vivienda_ID`) REFERENCES `viviendas` (`vivienda_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
