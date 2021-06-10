-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2021 a las 17:58:58
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

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
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2021_05_05_152343_create_usuarios_table', 1),
(2, '2021_05_05_152431_create_trabajos_table', 1),
(3, '2021_05_05_152453_create_viviendas_table', 1),
(4, '2021_05_05_152517_create_trabajo_usuario_table', 1),
(5, '2021_05_05_152539_create_usuario_vivienda_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos`
--

CREATE TABLE `trabajos` (
  `trabajo_ID` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localidad` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enlace` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jornada` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contrato` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salario` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experiencia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `funciones` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requisitos` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ofrece` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajo_usuario`
--

CREATE TABLE `trabajo_usuario` (
  `trabajo_ID` int(10) UNSIGNED NOT NULL,
  `user_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user_ID` int(10) UNSIGNED NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `sector` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estudios` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experiencia_laboral` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idiomas` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_vivienda`
--

CREATE TABLE `usuario_vivienda` (
  `user_ID` int(10) UNSIGNED NOT NULL,
  `vivienda_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viviendas`
--

CREATE TABLE `viviendas` (
  `vivienda_ID` int(10) UNSIGNED NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lugar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `habitaciones` int(11) DEFAULT NULL,
  `banos` int(11) DEFAULT NULL,
  `metros2` int(11) DEFAULT NULL,
  `planta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `compr_alq_compar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagenes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contacto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  ADD PRIMARY KEY (`trabajo_ID`);

--
-- Indices de la tabla `trabajo_usuario`
--
ALTER TABLE `trabajo_usuario`
  ADD KEY `trabajo_usuario_trabajo_id_foreign` (`trabajo_ID`),
  ADD KEY `trabajo_usuario_user_id_foreign` (`user_ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user_ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuario_vivienda`
--
ALTER TABLE `usuario_vivienda`
  ADD KEY `usuario_vivienda_user_id_foreign` (`user_ID`),
  ADD KEY `usuario_vivienda_vivienda_id_foreign` (`vivienda_ID`);

--
-- Indices de la tabla `viviendas`
--
ALTER TABLE `viviendas`
  ADD PRIMARY KEY (`vivienda_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  MODIFY `trabajo_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `viviendas`
--
ALTER TABLE `viviendas`
  MODIFY `vivienda_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `trabajo_usuario`
--
ALTER TABLE `trabajo_usuario`
  ADD CONSTRAINT `trabajo_usuario_trabajo_id_foreign` FOREIGN KEY (`trabajo_ID`) REFERENCES `trabajos` (`trabajo_ID`),
  ADD CONSTRAINT `trabajo_usuario_user_id_foreign` FOREIGN KEY (`user_ID`) REFERENCES `usuarios` (`user_ID`);

--
-- Filtros para la tabla `usuario_vivienda`
--
ALTER TABLE `usuario_vivienda`
  ADD CONSTRAINT `usuario_vivienda_user_id_foreign` FOREIGN KEY (`user_ID`) REFERENCES `usuarios` (`user_ID`),
  ADD CONSTRAINT `usuario_vivienda_vivienda_id_foreign` FOREIGN KEY (`vivienda_ID`) REFERENCES `viviendas` (`vivienda_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
