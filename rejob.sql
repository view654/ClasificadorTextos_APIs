-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2021 a las 12:09:50
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user_ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
