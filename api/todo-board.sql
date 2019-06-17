SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `access` (
  `aId` int(11) NOT NULL,
  `uId` int(11) NOT NULL COMMENT 'User Id',
  `tId` int(11) NOT NULL COMMENT 'Topic Id'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

CREATE TABLE `elements` (
  `eId` int(11) NOT NULL,
  `label` text COLLATE utf16_bin NOT NULL,
  `sortIndex` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `tId` int(11) NOT NULL COMMENT 'Topic Id'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

CREATE TABLE `topics` (
  `tId` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf16_bin NOT NULL DEFAULT '',
  `sortIndex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

CREATE TABLE `users` (
  `uId` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf16_bin NOT NULL,
  `password` varchar(255) COLLATE utf16_bin NOT NULL,
  `authkey` varchar(255) COLLATE utf16_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;


ALTER TABLE `access`
  ADD PRIMARY KEY (`aId`);

ALTER TABLE `elements`
  ADD PRIMARY KEY (`eId`);

ALTER TABLE `topics`
  ADD PRIMARY KEY (`tId`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`uId`);


ALTER TABLE `access`
  MODIFY `aId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `elements`
  MODIFY `eId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `topics`
  MODIFY `tId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `users`
  MODIFY `uId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
