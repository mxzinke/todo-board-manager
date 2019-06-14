-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 14. Jun 2019 um 16:52
-- Server-Version: 5.7.26-0ubuntu0.18.04.1
-- PHP-Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `todo-board`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `access`
--

CREATE TABLE `access` (
  `aId` int(11) NOT NULL,
  `uId` int(11) NOT NULL COMMENT 'User Id',
  `tId` int(11) NOT NULL COMMENT 'Topic Id'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `elements`
--

CREATE TABLE `elements` (
  `eId` int(11) NOT NULL,
  `label` text COLLATE utf16_bin NOT NULL,
  `sortIndex` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `tId` int(11) NOT NULL COMMENT 'Topic Id'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Daten für Tabelle `elements`
--

INSERT INTO `elements` (`eId`, `label`, `sortIndex`, `state`, `tId`) VALUES
(1, 'Add possibilty of changing state (synced with API)', 1, 1, 1),
(2, 'Adding Patch to elements-Entrypoint for State-Changing', 2, 1, 1),
(4, 'Planing Structure', 1, 1, 2),
(5, 'Planing Components', 2, 0, 2),
(6, 'Adding Websockets-Events to TopicHandlers', 3, 0, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `topics`
--

CREATE TABLE `topics` (
  `tId` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf16_bin NOT NULL DEFAULT '',
  `sortIndex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Daten für Tabelle `topics`
--

INSERT INTO `topics` (`tId`, `title`, `sortIndex`) VALUES
(1, 'Projekt ToDo-Board', 1),
(2, 'Projekt History-View', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `uId` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf16_bin NOT NULL,
  `password` varchar(255) COLLATE utf16_bin NOT NULL,
  `authkey` varchar(255) COLLATE utf16_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`aId`);

--
-- Indizes für die Tabelle `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`eId`);

--
-- Indizes für die Tabelle `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`tId`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `access`
--
ALTER TABLE `access`
  MODIFY `aId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `elements`
--
ALTER TABLE `elements`
  MODIFY `eId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `topics`
--
ALTER TABLE `topics`
  MODIFY `tId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `uId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
