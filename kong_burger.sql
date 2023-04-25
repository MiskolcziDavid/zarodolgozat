-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 11. 20:27
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kong burger`
--
CREATE DATABASE IF NOT EXISTS `kong burger` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `kong burger`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosarak`
--

CREATE TABLE `kosarak` (
  `id` int(11) NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `termek_nev` varchar(255) NOT NULL,
  `termek_ar` int(11) NOT NULL,
  `termek_db` int(3) NOT NULL,
  `termek_kep` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kosarak`
--

INSERT INTO `kosarak` (`id`, `user_id`, `termek_nev`, `termek_ar`, `termek_db`, `termek_kep`) VALUES
(8, 10, 'Tojás Burger', 990, 4, '../frontend/img/tojas.png'),
(9, 10, 'Muffin', 4890, 4, '../frontend/img/guacamole.png'),
(10, 10, 'Honey Kong', 3765, 12, '../frontend/img/honey.png'),
(11, 10, 'Spicy Burger', 2960, 5, '../frontend/img/spicy.png'),
(12, 10, 'Kong Farm', 4452, 4, '../frontend/img/kfarm.png'),
(13, 10, 'Big Kong', 2190, 5, '../frontend/img/big mac.png'),
(14, 10, 'Csibe Burger', 1790, 4, '../frontend/img/csirke.png'),
(15, 10, 'Muffin', 4890, 1, '../frontend/img/guacamole.png'),
(16, 10, 'Tojás Burger', 990, 1, '../frontend/img/tojas.png'),
(17, 10, 'Muffin', 4890, 1, '../frontend/img/guacamole.png'),
(18, 10, 'Tojás Burger', 990, 1, '../frontend/img/tojas.png'),
(19, 10, 'Muffin', 4890, 1, '../frontend/img/guacamole.png'),
(20, 10, 'Muffin', 4890, 1, '../frontend/img/guacamole.png'),
(21, 10, 'Tojás Burger', 990, 5, '../frontend/img/tojas.png'),
(22, 6, 'Dupla Kong', 3920, 2, '../frontend/img/duplakong.png'),
(23, 6, 'Sajtburger', 900, 10, '../frontend/img/sajtb.png'),
(24, 6, 'Csibe Burger', 1790, 13, '../frontend/img/csirke.png'),
(25, 6, 'Big Kong', 2190, 15, '../frontend/img/big mac.png'),
(26, 6, 'Sajtburger', 900, 20, '../frontend/img/sajtb.png'),
(27, 6, 'Muffin', 4890, 4, '../frontend/img/guacamole.png'),
(28, 6, 'Csibe Burger', 1790, 6, '../frontend/img/csirke.png'),
(29, 11, 'Honey Kong', 3765, 1, '../frontend/img/honey.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `termek_id` int(11) NOT NULL,
  `termek_nev` varchar(255) NOT NULL,
  `termek_ar` int(11) NOT NULL,
  `k_id` int(11) NOT NULL,
  `kepek` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`termek_id`, `termek_nev`, `termek_ar`, `k_id`, `kepek`) VALUES
(1, 'Csibe Burger\r\n', 1790, 1, ''),
(2, 'Big Kong', 2190, 2, ''),
(3, 'Sajtburger', 900, 3, ''),
(4, 'Dupla Kong', 3920, 4, ''),
(5, 'Spicy Burger', 2960, 5, ''),
(6, 'Honey Kong', 3765, 6, ''),
(7, 'Kong Farm', 4452, 7, ''),
(8, 'Halas Burger', 2390, 8, ''),
(9, 'Dupla Sajt', 3190, 9, ''),
(10, 'Pinky Burger', 1960, 10, ''),
(11, 'Glutén-Off', 3920, 11, ''),
(12, 'Hamburger', 1190, 12, ''),
(13, 'Tojás Burger', 990, 13, ''),
(14, 'Muffin', 4890, 14, '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2b$10$i477y50N7ddxU/Nau2HypOcprWF0.llsVHdp74dxo5BOIK4pCHz/u', 'admin'),
(2, 'user', '$2b$10$YoKHss1plgx42XU/aOOQIuMQLULO35LPOcbqji7uvgt5fLqsy8HLC', 'user'),
(3, 'test', '$2b$10$WhaEaCb3PnrKj3DFMiH5FeNAxd7C.CQCErGWwc43rqBriU1KEQBeC', 'user'),
(5, 'miskolczidavid', '$2b$10$90I4mf4VI5wE/ukYEba80emyCBgpFktR1SkJQ3kEl50vXymB6Q5qS', 'user'),
(6, 'ddave', '$2b$10$yulcNyoCl/mqSSQRf3zLguSfrtOOLphr.mhKxfcyesl/.JJwtq3iS', 'user'),
(7, 'felh', '$2b$10$rzPv8DvPiEIvnSlh0cDYxOC0dsLUj6sZsWNmX7CY9eM6jukhK3fU2', 'user'),
(8, 'felhasz', '$2b$10$C6eTdZK0BdVn4.hrEV1VfOllN/Jzsnx8idK56UwzjFJdftgd0oqHC', 'user'),
(9, 'fh12', '$2b$10$W18sZ5nQ6cDtcHwORv7hdO32055Us/JaJAio//h5p/3mZYLomgDXe', 'user'),
(10, 'teszt', '$2b$10$NqZFcoop2wCSnwJypuk.ZOk1ewn09OLqjqJLw4wbhJtkpMfF15AbS', 'user'),
(11, 'Tomcsi', '$2b$10$AHjoIyZFc9/lnVYjmCNemudSeDb8i461Rw4Y.9gyr3HdFgfpNx01a', 'user');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kosarak`
--
ALTER TABLE `kosarak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kosarak_ibfk_1` (`user_id`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`termek_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kosarak`
--
ALTER TABLE `kosarak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `termek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kosarak`
--
ALTER TABLE `kosarak`
  ADD CONSTRAINT `kosarak_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
