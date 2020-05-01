-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 01, 2020 lúc 04:53 PM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `investor_management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `investorinproject`
--

CREATE TABLE `investorinproject` (
  `investorId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `investmentPercentage` double NOT NULL,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `investorinproject`
--

INSERT INTO `investorinproject` (`investorId`, `projectId`, `investmentPercentage`, `name`) VALUES
(1, 1, 30, 'bin'),
(2, 1, 40, 'dat'),
(3, 2, 40, 'minh'),
(4, 2, 30, 'pqd');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `investorprofit`
--

CREATE TABLE `investorprofit` (
  `investorProjectId` int(11) NOT NULL,
  `amount` double NOT NULL,
  `date` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `investorprofit`
--

INSERT INTO `investorprofit` (`investorProjectId`, `amount`, `date`) VALUES
(1, 122, '2020-12-12'),
(2, 100, '2020-09-12'),
(2, 10, '2020-04-13'),
(1, 500, '2020-05-01'),
(4, 100, '2019-06-03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `price` double NOT NULL,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `project`
--

INSERT INTO `project` (`id`, `price`, `name`, `description`) VALUES
(1, 342, 'abc', ''),
(2, 1009, 'bin', ''),
(3, 300, 'Novels', ''),
(4, 3000, 'Stock', 'abc');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `investorinproject`
--
ALTER TABLE `investorinproject`
  ADD PRIMARY KEY (`investorId`);

--
-- Chỉ mục cho bảng `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `investorinproject`
--
ALTER TABLE `investorinproject`
  MODIFY `investorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
