-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 19, 2024 at 08:21 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dsp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `UserID` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `EID` int NOT NULL,
  `UserID` int NOT NULL,
  `Review` varchar(300) NOT NULL,
  `Rating` int NOT NULL,
  `CID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`CID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`EID`, `UserID`, `Review`, `Rating`, `CID`) VALUES
(1, 1, 'Test', 5, 1),
(1, 2, 'null', 5, 2),
(1, 2, 'null', 5, 3),
(1, 4, 'Pog', 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `Rso` int NOT NULL,
  `Public` int NOT NULL,
  `UID` int NOT NULL,
  `Approve` int NOT NULL,
  `EName` varchar(50) NOT NULL,
  `ECat` varchar(50) NOT NULL,
  `EDesc` varchar(300) NOT NULL,
  `Time` varchar(50) NOT NULL,
  `Date` varchar(50) NOT NULL,
  `Location` varchar(50) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `EID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`EID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`Rso`, `Public`, `UID`, `Approve`, `EName`, `ECat`, `EDesc`, `Time`, `Date`, `Location`, `Phone`, `Email`, `EID`) VALUES
(0, 1, 1, 1, 'Dance1', 'Dance2', 'Dancing', '10:49', '01/24', 'UCF', '4073214321', 'Dance@gmail.aom', 1),
(1, 1, 1, 1, 'Sing1', 'Sing2', 'Sing', '04:49', '01/12', 'UCF', '4073214123', 'Sing@gmail.aom', 2),
(2, 1, 1, 0, 'Sing1Test', 'Sing2Test', 'SingTest', '04:49', '01/12', 'UCF', '4073214123', 'Sing@gmail.aom', 3),
(3, 0, 1, 1, 'Sing1TestTest', 'Sing2TestTEst', 'SingTestTEst', '04:49', '01/12', 'UCF', '4073214123', 'Sing@gmail.aom', 4),
(2, 0, 1, 1, 'Sing1TestTestTest', 'Sing2TestTEstTEst', 'SingTestTEstTest', '04:49', '01/12', 'UCF', '4073214123', 'Sing@gmail.aom', 5);

-- --------------------------------------------------------

--
-- Table structure for table `rso`
--

DROP TABLE IF EXISTS `rso`;
CREATE TABLE IF NOT EXISTS `rso` (
  `RID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Description` varchar(300) NOT NULL,
  `Time` varchar(50) NOT NULL,
  `Date` varchar(50) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rsousers`
--

DROP TABLE IF EXISTS `rsousers`;
CREATE TABLE IF NOT EXISTS `rsousers` (
  `UserID` int NOT NULL,
  `RsoID` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
CREATE TABLE IF NOT EXISTS `university` (
  `Name` varchar(50) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Description` varchar(300) NOT NULL,
  `StudentsNum` int NOT NULL,
  `UID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`UID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(50) NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  `UID` int NOT NULL,
  `RSO1` varchar(5) NOT NULL,
  `RSO2` varchar(5) NOT NULL,
  `RSO3` varchar(5) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Username`, `Password`, `Name`, `Email`, `ID`, `UID`, `RSO1`, `RSO2`, `RSO3`) VALUES
('Test', 'Test', 'TestName', 'TestName@gmail.com', 1, 1, '1', '2', '0'),
('Test123', '123', 'TestName', 'TestName@gmail.com', 4, 1, '1', '2', '0');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
