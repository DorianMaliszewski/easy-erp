drop table if exists oauth_client_details;
create table oauth_client_details (
                                      client_id VARCHAR(255) PRIMARY KEY,
                                      resource_ids VARCHAR(255),
                                      client_secret VARCHAR(255),
                                      scope VARCHAR(255),
                                      authorized_grant_types VARCHAR(255),
                                      web_server_redirect_uri VARCHAR(255),
                                      authorities VARCHAR(255),
                                      access_token_validity INTEGER,
                                      refresh_token_validity INTEGER,
                                      additional_information VARCHAR(4096),
                                      autoapprove VARCHAR(255)
);

-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.10-MariaDB-1:10.3.10+maria~bionic

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `oauth_user`
--

DROP TABLE IF EXISTS `oauth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_user` (
                              `id` bigint(20) NOT NULL AUTO_INCREMENT,
                              `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
                              `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
                              `version` bigint(20) DEFAULT 0,
                              `account_expired` bit(1) DEFAULT 0,
                              `account_locked` bit(1) DEFAULT 0,
                              `credentials_expired` bit(1) DEFAULT 0,
                              `email` varchar(255) DEFAULT NULL,
                              `enabled` bit(1) DEFAULT 1,
                              `deleted` bit(1) DEFAULT 0,
                              `first_name` varchar(255) DEFAULT NULL,
                              `last_name` varchar(255) DEFAULT NULL,
                              `phone_number` varchar(255) DEFAULT NULL,
                              `password` varchar(255) DEFAULT NULL,
                              `username` varchar(255) DEFAULT NULL,
                              `role_id` bigint(20) DEFAULT NULL,
                              `client_id` bigint(20) DEFAULT NULL,
                              tenant_id bigint(20) DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              UNIQUE KEY (username),
                              KEY `FKk9drunl8th2rtcvs4pd3cxr6h` (`role_id`),
                              CONSTRAINT FK_oauth_user_tenant FOREIGN KEY (tenant_id) REFERENCES tenant(id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_user`
--

LOCK TABLES `oauth_user` WRITE;
/*!40000 ALTER TABLE `oauth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
                              `id` bigint(20) NOT NULL AUTO_INCREMENT,
                              `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
                              `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
                              `version` bigint(20) DEFAULT 0,
                              `name` varchar(255) DEFAULT NULL,
                              PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
                        `id` bigint(20) NOT NULL AUTO_INCREMENT,
                        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
                        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
                        `version` bigint(20) DEFAULT 0,
                        `name` varchar(255) DEFAULT NULL,
                        description varchar(255) DEFAULT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permissions` (
                                    `user_id` bigint(20) NOT NULL,
                                    `permission_id` bigint(20) NOT NULL,
                                    KEY `FKh0v7u4w7mttcu81o8wegayr8e` (`permission_id`),
                                    KEY `FKlodb7xh4a2xjv39gc3lsop95n` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-10 17:35:47

DROP TABLE IF EXISTS `tenant`;

CREATE TABLE `tenant` (
                          id bigint(20) NOT NULL AUTO_INCREMENT,
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          enabled bit(1) DEFAULT 1,
                          deleted bit(1) DEFAULT 0,
                          version bigint(20) DEFAULT NULL,
                          name varchar(255) DEFAULT  NULL,
                          phone varchar(20) DEFAULT NULL,
                          site varchar(255) DEFAULT NULL,
                          email varchar(50) DEFAULT NULL,
                          instance_url varchar(255) DEFAULT NULL,
                          address varchar(255) DEFAULT NULL,
                          postal_code varchar(10) DEFAULT NULL,
                          main_user_id bigint(20) DEFAULT NULL,
                          subscription_id bigint(20) DEFAULT NULL,
                          PRIMARY KEY (id),
                          CONSTRAINT FK_client_main_contact FOREIGN KEY (main_user_id) REFERENCES oauth_user(id),
                          CONSTRAINT FK_subscription FOREIGN KEY (subscription_id) REFERENCES oauth_user(id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


--
-- Table subscription
--
DROP TABLE IF EXISTS subscription;

CREATE TABLE subscription (
                              id bigint(20) NOT NULL AUTO_INCREMENT,
                              name varchar(255) NOT NULL UNIQUE,
                              price double DEFAULT NULL,
                              PRIMARY KEY (id)
);