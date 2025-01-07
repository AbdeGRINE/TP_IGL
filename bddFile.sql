-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: tp_igl
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Token',7,'add_token'),(26,'Can change Token',7,'change_token'),(27,'Can delete Token',7,'delete_token'),(28,'Can view Token',7,'view_token'),(29,'Can add Token',8,'add_tokenproxy'),(30,'Can change Token',8,'change_tokenproxy'),(31,'Can delete Token',8,'delete_tokenproxy'),(32,'Can view Token',8,'view_tokenproxy'),(33,'Can add admin',9,'add_admin'),(34,'Can change admin',9,'change_admin'),(35,'Can delete admin',9,'delete_admin'),(36,'Can view admin',9,'view_admin'),(37,'Can add compte rendu',10,'add_compterendu'),(38,'Can change compte rendu',10,'change_compterendu'),(39,'Can delete compte rendu',10,'delete_compterendu'),(40,'Can view compte rendu',10,'view_compterendu'),(41,'Can add dpi',11,'add_dpi'),(42,'Can change dpi',11,'change_dpi'),(43,'Can delete dpi',11,'delete_dpi'),(44,'Can view dpi',11,'view_dpi'),(45,'Can add etablissement',12,'add_etablissement'),(46,'Can change etablissement',12,'change_etablissement'),(47,'Can delete etablissement',12,'delete_etablissement'),(48,'Can view etablissement',12,'view_etablissement'),(49,'Can add medicament',13,'add_medicament'),(50,'Can change medicament',13,'change_medicament'),(51,'Can delete medicament',13,'delete_medicament'),(52,'Can view medicament',13,'view_medicament'),(53,'Can add patient',14,'add_patient'),(54,'Can change patient',14,'change_patient'),(55,'Can delete patient',14,'delete_patient'),(56,'Can view patient',14,'view_patient'),(57,'Can add consultation',15,'add_consultation'),(58,'Can change consultation',15,'change_consultation'),(59,'Can delete consultation',15,'delete_consultation'),(60,'Can view consultation',15,'view_consultation'),(61,'Can add hospitalisation',16,'add_hospitalisation'),(62,'Can change hospitalisation',16,'change_hospitalisation'),(63,'Can delete hospitalisation',16,'delete_hospitalisation'),(64,'Can view hospitalisation',16,'view_hospitalisation'),(65,'Can add image',17,'add_image'),(66,'Can change image',17,'change_image'),(67,'Can delete image',17,'delete_image'),(68,'Can view image',17,'view_image'),(69,'Can add infermier',18,'add_infermier'),(70,'Can change infermier',18,'change_infermier'),(71,'Can delete infermier',18,'delete_infermier'),(72,'Can view infermier',18,'view_infermier'),(73,'Can add laborantin',19,'add_laborantin'),(74,'Can change laborantin',19,'change_laborantin'),(75,'Can delete laborantin',19,'delete_laborantin'),(76,'Can view laborantin',19,'view_laborantin'),(77,'Can add bilan',20,'add_bilan'),(78,'Can change bilan',20,'change_bilan'),(79,'Can delete bilan',20,'delete_bilan'),(80,'Can view bilan',20,'view_bilan'),(81,'Can add medcin',21,'add_medcin'),(82,'Can change medcin',21,'change_medcin'),(83,'Can delete medcin',21,'delete_medcin'),(84,'Can view medcin',21,'view_medcin'),(85,'Can add ordonnance',22,'add_ordonnance'),(86,'Can change ordonnance',22,'change_ordonnance'),(87,'Can delete ordonnance',22,'delete_ordonnance'),(88,'Can view ordonnance',22,'view_ordonnance'),(89,'Can add personne a contacter',23,'add_personneacontacter'),(90,'Can change personne a contacter',23,'change_personneacontacter'),(91,'Can delete personne a contacter',23,'delete_personneacontacter'),(92,'Can view personne a contacter',23,'view_personneacontacter'),(93,'Can add radiologue',24,'add_radiologue'),(94,'Can change radiologue',24,'change_radiologue'),(95,'Can delete radiologue',24,'delete_radiologue'),(96,'Can view radiologue',24,'view_radiologue'),(97,'Can add resume',25,'add_resume'),(98,'Can change resume',25,'change_resume'),(99,'Can delete resume',25,'delete_resume'),(100,'Can view resume',25,'view_resume'),(101,'Can add soin',26,'add_soin'),(102,'Can change soin',26,'change_soin'),(103,'Can delete soin',26,'delete_soin'),(104,'Can view soin',26,'view_soin'),(105,'Can add test',27,'add_test'),(106,'Can change test',27,'change_test'),(107,'Can delete test',27,'delete_test'),(108,'Can view test',27,'view_test'),(109,'Can add traitement',28,'add_traitement'),(110,'Can change traitement',28,'change_traitement'),(111,'Can delete traitement',28,'delete_traitement'),(112,'Can view traitement',28,'view_traitement'),(113,'Can add admin',29,'add_admin'),(114,'Can change admin',29,'change_admin'),(115,'Can delete admin',29,'delete_admin'),(116,'Can view admin',29,'view_admin'),(117,'Can add medicament',30,'add_medicament'),(118,'Can change medicament',30,'change_medicament'),(119,'Can delete medicament',30,'delete_medicament'),(120,'Can view medicament',30,'view_medicament'),(121,'Can add soin',31,'add_soin'),(122,'Can change soin',31,'change_soin'),(123,'Can delete soin',31,'delete_soin'),(124,'Can view soin',31,'view_soin'),(125,'Can add resume',32,'add_resume'),(126,'Can change resume',32,'change_resume'),(127,'Can delete resume',32,'delete_resume'),(128,'Can view resume',32,'view_resume'),(129,'Can add traitement',33,'add_traitement'),(130,'Can change traitement',33,'change_traitement'),(131,'Can delete traitement',33,'delete_traitement'),(132,'Can view traitement',33,'view_traitement'),(133,'Can add personne a contacter',34,'add_personneacontacter'),(134,'Can change personne a contacter',34,'change_personneacontacter'),(135,'Can delete personne a contacter',34,'delete_personneacontacter'),(136,'Can view personne a contacter',34,'view_personneacontacter'),(137,'Can add image',35,'add_image'),(138,'Can change image',35,'change_image'),(139,'Can delete image',35,'delete_image'),(140,'Can view image',35,'view_image'),(141,'Can add patient',36,'add_patient'),(142,'Can change patient',36,'change_patient'),(143,'Can delete patient',36,'delete_patient'),(144,'Can view patient',36,'view_patient'),(145,'Can add radiologue',37,'add_radiologue'),(146,'Can change radiologue',37,'change_radiologue'),(147,'Can delete radiologue',37,'delete_radiologue'),(148,'Can view radiologue',37,'view_radiologue'),(149,'Can add hospitalisation',38,'add_hospitalisation'),(150,'Can change hospitalisation',38,'change_hospitalisation'),(151,'Can delete hospitalisation',38,'delete_hospitalisation'),(152,'Can view hospitalisation',38,'view_hospitalisation'),(153,'Can add infermier',39,'add_infermier'),(154,'Can change infermier',39,'change_infermier'),(155,'Can delete infermier',39,'delete_infermier'),(156,'Can view infermier',39,'view_infermier'),(157,'Can add laborantin',40,'add_laborantin'),(158,'Can change laborantin',40,'change_laborantin'),(159,'Can delete laborantin',40,'delete_laborantin'),(160,'Can view laborantin',40,'view_laborantin'),(161,'Can add compte rendu',41,'add_compterendu'),(162,'Can change compte rendu',41,'change_compterendu'),(163,'Can delete compte rendu',41,'delete_compterendu'),(164,'Can view compte rendu',41,'view_compterendu'),(165,'Can add consultation',42,'add_consultation'),(166,'Can change consultation',42,'change_consultation'),(167,'Can delete consultation',42,'delete_consultation'),(168,'Can view consultation',42,'view_consultation'),(169,'Can add etablissement',43,'add_etablissement'),(170,'Can change etablissement',43,'change_etablissement'),(171,'Can delete etablissement',43,'delete_etablissement'),(172,'Can view etablissement',43,'view_etablissement'),(173,'Can add medcin',44,'add_medcin'),(174,'Can change medcin',44,'change_medcin'),(175,'Can delete medcin',44,'delete_medcin'),(176,'Can view medcin',44,'view_medcin'),(177,'Can add ordonnance',45,'add_ordonnance'),(178,'Can change ordonnance',45,'change_ordonnance'),(179,'Can delete ordonnance',45,'delete_ordonnance'),(180,'Can view ordonnance',45,'view_ordonnance'),(181,'Can add bilan',46,'add_bilan'),(182,'Can change bilan',46,'change_bilan'),(183,'Can delete bilan',46,'delete_bilan'),(184,'Can view bilan',46,'view_bilan'),(185,'Can add dpi',47,'add_dpi'),(186,'Can change dpi',47,'change_dpi'),(187,'Can delete dpi',47,'delete_dpi'),(188,'Can view dpi',47,'view_dpi'),(189,'Can add test',48,'add_test'),(190,'Can change test',48,'change_test'),(191,'Can delete test',48,'delete_test'),(192,'Can view test',48,'view_test');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$870000$e1HAJNnO2X1e1G71l207nj$kbCsrebnRFmwlCA6U6XkkoZudnIMybeuydGuEwLffp0=','2025-01-06 23:08:50.133604',1,'hassina','','','mh_lounnaci@esi.dz',1,1,'2025-01-06 23:08:19.458716'),(2,'pbkdf2_sha256$870000$NElpRjaZuDySFWPUc6EFRF$Rjh+/nSUrO01ltNNZeeoosNqaPbY9uUQ9Eir7A52UTs=',NULL,0,'khadidja_medcin','','','',0,1,'2025-01-06 23:15:38.253742'),(3,'pbkdf2_sha256$870000$wO15vNSuKJXadXLex2Uz9y$45uulV9Rxug4r4JQm8RwFA4JZ+PZnkU/Dxv/3YAz8iE=',NULL,0,'infBenziadaFares','','','',0,1,'2025-01-06 23:45:39.513114'),(4,'pbkdf2_sha256$870000$viuOZW4MbVNfKFgYlvabV6$WZ+mJiQy69bJ9wY/BnG5HPyEfmC1VJwX0DuBspUmp1A=',NULL,0,'infAitahmed','','','',0,1,'2025-01-06 23:46:45.545558'),(5,'pbkdf2_sha256$870000$e1Uuo80P9w9VpQjMoIryd3$siKMqRQVQhRhxc6U9KxlEA52S/QVrzia//IrgcYLnNY=',NULL,0,'infAbderrahmane','','','',0,1,'2025-01-06 23:47:42.212551'),(6,'pbkdf2_sha256$870000$A9xCt0qoHOQf23D0ofHdB4$6fhA4ZnxBaqDqVKhbEdQ7B/sqmtH7HtR3Sghhr0flEk=',NULL,0,'medLounnaci','','','',0,1,'2025-01-06 23:49:23.596567'),(7,'pbkdf2_sha256$870000$e31CaxLxVf87TvYiF9rWOH$Ha2gb9oHnlmjPm5fol6om7LAtUZxkZ5Q9a+XEeOmLRo=',NULL,0,'medKhadidja','','','',0,1,'2025-01-06 23:50:48.014606'),(8,'pbkdf2_sha256$870000$5ANgYsrm2H60rzE9A3QLQO$H5tF+XgauVMT57RN+rEeTDuyuIPd7t133CcIFb+I1rM=',NULL,0,'medFares','','','',0,1,'2025-01-06 23:52:25.880119'),(9,'pbkdf2_sha256$870000$oQADcKG1IDCeBUvJHSJoCV$Kb2WJvIdpi5M4LIin3QwiendEsDPQ66DwxqB2ib2NDo=',NULL,0,'hassinalounnaci','','','',0,1,'2025-01-06 23:54:30.648328');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('59501265e5ad9f7e1d3e0b6da5cd17bc98fa1027','2025-01-06 23:15:39.199406',2);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-01-06 23:09:26.081408','1','CHU Tizi Ouzou',1,'[{\"added\": {}}]',12,1),(2,'2025-01-06 23:09:39.655273','1','CHU Tizi Ouzou',2,'[]',12,1),(3,'2025-01-06 23:45:40.406611','3','infBenziadaFares',1,'[{\"added\": {}}]',4,1),(4,'2025-01-06 23:45:51.152361','1','infBenziada Fares',1,'[{\"added\": {}}]',18,1),(5,'2025-01-06 23:46:46.412634','4','infAitahmed',1,'[{\"added\": {}}]',4,1),(6,'2025-01-06 23:46:49.036805','2','infAitahmed Meriem',1,'[{\"added\": {}}]',18,1),(7,'2025-01-06 23:47:43.040730','5','infAbderrahmane',1,'[{\"added\": {}}]',4,1),(8,'2025-01-06 23:47:46.240832','3','infGrine Abderrahmane',1,'[{\"added\": {}}]',18,1),(9,'2025-01-06 23:49:24.415599','6','medLounnaci',1,'[{\"added\": {}}]',4,1),(10,'2025-01-06 23:49:29.099529','2','medlounnaci hassina',1,'[{\"added\": {}}]',21,1),(11,'2025-01-06 23:50:48.846248','7','medKhadidja',1,'[{\"added\": {}}]',4,1),(12,'2025-01-06 23:50:52.915323','3','medMessaoud Amal',1,'[{\"added\": {}}]',21,1),(13,'2025-01-06 23:52:26.828974','8','medFares',1,'[{\"added\": {}}]',4,1),(14,'2025-01-06 23:52:30.559075','4','medFoudhili khadidja',1,'[{\"added\": {}}]',21,1),(15,'2025-01-06 23:54:31.509803','9','hassinalounnaci',1,'[{\"added\": {}}]',4,1),(16,'2025-01-06 23:56:47.965860','2','Lounnaci Hassina',1,'[{\"added\": {}}]',14,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'authtoken','token'),(8,'authtoken','tokenproxy'),(5,'contenttypes','contenttype'),(29,'dpi','admin'),(46,'dpi','bilan'),(41,'dpi','compterendu'),(42,'dpi','consultation'),(47,'dpi','dpi'),(43,'dpi','etablissement'),(38,'dpi','hospitalisation'),(35,'dpi','image'),(39,'dpi','infermier'),(40,'dpi','laborantin'),(44,'dpi','medcin'),(30,'dpi','medicament'),(45,'dpi','ordonnance'),(36,'dpi','patient'),(34,'dpi','personneacontacter'),(37,'dpi','radiologue'),(32,'dpi','resume'),(31,'dpi','soin'),(48,'dpi','test'),(33,'dpi','traitement'),(6,'sessions','session'),(9,'users','admin'),(20,'users','bilan'),(10,'users','compterendu'),(15,'users','consultation'),(11,'users','dpi'),(12,'users','etablissement'),(16,'users','hospitalisation'),(17,'users','image'),(18,'users','infermier'),(19,'users','laborantin'),(21,'users','medcin'),(13,'users','medicament'),(22,'users','ordonnance'),(14,'users','patient'),(23,'users','personneacontacter'),(24,'users','radiologue'),(25,'users','resume'),(26,'users','soin'),(27,'users','test'),(28,'users','traitement');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-12-20 19:06:38.318307'),(2,'auth','0001_initial','2024-12-20 19:06:51.352464'),(3,'admin','0001_initial','2024-12-20 19:06:54.357329'),(4,'admin','0002_logentry_remove_auto_add','2024-12-20 19:06:54.454878'),(5,'admin','0003_logentry_add_action_flag_choices','2024-12-20 19:06:54.524472'),(6,'contenttypes','0002_remove_content_type_name','2024-12-20 19:06:55.925565'),(7,'auth','0002_alter_permission_name_max_length','2024-12-20 19:06:57.261118'),(8,'auth','0003_alter_user_email_max_length','2024-12-20 19:06:57.546675'),(9,'auth','0004_alter_user_username_opts','2024-12-20 19:06:57.636056'),(10,'auth','0005_alter_user_last_login_null','2024-12-20 19:06:58.651970'),(11,'auth','0006_require_contenttypes_0002','2024-12-20 19:06:58.707947'),(12,'auth','0007_alter_validators_add_error_messages','2024-12-20 19:06:58.779661'),(13,'auth','0008_alter_user_username_max_length','2024-12-20 19:07:00.101951'),(14,'auth','0009_alter_user_last_name_max_length','2024-12-20 19:07:01.365405'),(15,'auth','0010_alter_group_name_max_length','2024-12-20 19:07:01.578886'),(16,'auth','0011_update_proxy_permissions','2024-12-20 19:07:01.686079'),(17,'auth','0012_alter_user_first_name_max_length','2024-12-20 19:07:03.060088'),(18,'authtoken','0001_initial','2024-12-20 19:07:05.082932'),(19,'authtoken','0002_auto_20160226_1747','2024-12-20 19:07:05.223114'),(20,'authtoken','0003_tokenproxy','2024-12-20 19:07:05.280130'),(21,'authtoken','0004_alter_tokenproxy_options','2024-12-20 19:07:05.361242'),(22,'sessions','0001_initial','2024-12-20 19:07:06.110551'),(23,'users','0001_initial','2024-12-20 19:07:45.314061'),(24,'users','0002_remove_bilan_redigant_bilan_redigant_laborantin_and_more','2024-12-20 19:07:50.059196'),(25,'users','0003_remove_resume_date','2024-12-20 19:07:50.449574'),(26,'dpi','0001_initial','2024-12-20 20:09:33.687354'),(27,'users','0002_alter_traitement_ordonnance','2024-12-23 22:07:50.175042'),(28,'users','0003_patient_user','2024-12-23 22:07:52.041252'),(29,'users','0004_admin_user_infermier_user_laborantin_user_and_more','2024-12-23 22:07:59.743640'),(30,'dpi','0002_delete_admin_remove_test_bilan_and_more','2024-12-23 22:08:48.054109'),(31,'users','0005_patient_personne_a_contacter_and_more','2024-12-29 00:18:14.560171'),(32,'users','0005_medicament_status','2025-01-01 13:27:00.395702'),(33,'users','0006_rename_status_medicament_type','2025-01-01 13:27:00.446263'),(34,'users','0007_alter_bilan_date_recuperation','2025-01-01 13:27:00.611338'),(35,'users','0008_bilan_graphique','2025-01-01 13:27:00.727365'),(36,'users','0009_remove_compterendu_test_compterendu_bilan','2025-01-01 13:27:01.147720'),(37,'users','0002_alter_dpi_etablissement_courant','2025-01-01 20:18:28.580085'),(38,'users','0003_alter_dpi_qr_code','2025-01-01 20:35:56.811672'),(39,'users','0002_patient_telephone','2025-01-06 20:23:47.641604');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('vvjj71eqhmviuzcsa7bwo0leccaahagb','.eJxVjDsOwjAUBO_iGlk2TmyLkp4zWPs-wQGUSPlUEXeHSCmg3ZnZzRSsSy3rrFPpxVyMN6ffjcBPHXYgDwz30fI4LFNPdlfsQWd7G0Vf18P9O6iY67eOoAhwzj51wgHiAnNIotRxyCDnBGfNjWvEJxJuRRGjRjTBt9zCvD8ihTlh:1tUwDK:SN7Qm7sPNNSe8HWYUY_DyiW8jQunaHyhfy76kgmnlI8','2025-01-20 23:08:50.191301');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_admin`
--

DROP TABLE IF EXISTS `users_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `users_admin_user_id_a330be1e_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_admin`
--

LOCK TABLES `users_admin` WRITE;
/*!40000 ALTER TABLE `users_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_bilan`
--

DROP TABLE IF EXISTS `users_bilan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_bilan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `date_demande` date NOT NULL,
  `date_recuperation` date DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `consultation_id` bigint NOT NULL,
  `redigant_laborantin_id` bigint DEFAULT NULL,
  `redigant_radiologue_id` bigint DEFAULT NULL,
  `graphique` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_bilan_consultation_id_afa1175d_fk_users_consultation_id` (`consultation_id`),
  KEY `users_bilan_redigant_laborantin__9d90e47f_fk_users_lab` (`redigant_laborantin_id`),
  KEY `users_bilan_redigant_radiologue__1e8d1ffe_fk_users_rad` (`redigant_radiologue_id`),
  CONSTRAINT `users_bilan_consultation_id_afa1175d_fk_users_consultation_id` FOREIGN KEY (`consultation_id`) REFERENCES `users_consultation` (`id`),
  CONSTRAINT `users_bilan_redigant_laborantin__9d90e47f_fk_users_lab` FOREIGN KEY (`redigant_laborantin_id`) REFERENCES `users_laborantin` (`id`),
  CONSTRAINT `users_bilan_redigant_radiologue__1e8d1ffe_fk_users_rad` FOREIGN KEY (`redigant_radiologue_id`) REFERENCES `users_radiologue` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_bilan`
--

LOCK TABLES `users_bilan` WRITE;
/*!40000 ALTER TABLE `users_bilan` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_bilan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_compterendu`
--

DROP TABLE IF EXISTS `users_compterendu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_compterendu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `resultat` longtext NOT NULL,
  `bilan_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_compterendu_bilan_id_0e5c795d_fk_users_bilan_id` (`bilan_id`),
  CONSTRAINT `users_compterendu_bilan_id_0e5c795d_fk_users_bilan_id` FOREIGN KEY (`bilan_id`) REFERENCES `users_bilan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_compterendu`
--

LOCK TABLES `users_compterendu` WRITE;
/*!40000 ALTER TABLE `users_compterendu` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_compterendu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_consultation`
--

DROP TABLE IF EXISTS `users_consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_consultation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `medecin_consulte` varchar(100) NOT NULL,
  `dpi_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_consultation_dpi_id_0f3a44db_fk_users_dpi_id` (`dpi_id`),
  CONSTRAINT `users_consultation_dpi_id_0f3a44db_fk_users_dpi_id` FOREIGN KEY (`dpi_id`) REFERENCES `users_dpi` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_consultation`
--

LOCK TABLES `users_consultation` WRITE;
/*!40000 ALTER TABLE `users_consultation` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_consultation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_dpi`
--

DROP TABLE IF EXISTS `users_dpi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_dpi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_creation` date NOT NULL,
  `qr_code` longtext NOT NULL,
  `etablissement_courant_id` bigint DEFAULT NULL,
  `medecin_traitant_id` bigint NOT NULL,
  `patient_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_dpi_medecin_traitant_id_7d87ff4a_fk_users_medcin_id` (`medecin_traitant_id`),
  KEY `users_dpi_patient_id_1f1fa7a1_fk_users_patient_id` (`patient_id`),
  KEY `users_dpi_etablissement_couran_b0178548_fk_users_eta` (`etablissement_courant_id`),
  CONSTRAINT `users_dpi_etablissement_couran_b0178548_fk_users_eta` FOREIGN KEY (`etablissement_courant_id`) REFERENCES `users_etablissement` (`id`),
  CONSTRAINT `users_dpi_medecin_traitant_id_7d87ff4a_fk_users_medcin_id` FOREIGN KEY (`medecin_traitant_id`) REFERENCES `users_medcin` (`id`),
  CONSTRAINT `users_dpi_patient_id_1f1fa7a1_fk_users_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `users_patient` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_dpi`
--

LOCK TABLES `users_dpi` WRITE;
/*!40000 ALTER TABLE `users_dpi` DISABLE KEYS */;
INSERT INTO `users_dpi` VALUES (1,'2025-01-06','iVBORw0KGgoAAAANSUhEUgAAAZoAAAGaAQAAAAAefbjOAAADKklEQVR4nO2bQW7jMAxFH8cGurSBHKBHcW4wRyp6pN4gPkoOUEBeBlDwZ0HJTjuz6aRwkppeCIHsh1AwQYuflIkvX+OvrzMQUEABBRRQQAH9TMjK1ZbZ0cwYzcysPxtM9YH9TcwLaH1okCQlcBcY0vzA1GJ7GkmSPkLrmRfQ+tBUAoAOAGMP9iJJBxr3g4sI8ihrCuh/oPavmelJQJMZ+wR07yamb/ingB4D+uwRNuhs/gsMDccWG95uZV5AN4M6SQdAr30jBp1MB8D2XfYHJOXbmRfQalCJEaPHhQYbjm2GaScb0i4b004GJW6sbl5Aq0PuEYuULTiZxueTCU4G3cmg+6h13/maAroesv3U+sDoKUWjklxMTyrfjyVQPMSaAroyRpSgoKGGA8G5LYEC0Ghgw2Fd8wJaHaIqT00dOskVqkHZBx26XEUsSTrc+ZoCugaivORO8revVG/Mcz4wu0V4xE+GWNRpzz6VGl2q2FXA1qGLGLEFiPqay8dh+YjUOcnDAzSKGPHzIS4DQALocg0UUh3muBEesRHIXtLZGJ9LKDDPNCfzQa89Xv26kXkBrZ99emp5fJINb20W5BY6YVBqHWLaZVvbvIBWh9wjbEh9lSt7TEy7stuE3Lq/uHq5snkBrQ7VrWSXa66hPA81+6Q2SUSusRXIt5J0klm/3DwbYw+STsbsFg+ypoCuihFDanQhTilBESUWFWJRJu58TQFdA1U9IjE3WzZe2qpKpVRV7BxfjQ1AdWf5VhIOvEki7TJjn4SXu6YWmPqodG0AmhWqUrQocwmqOHW5+QyFaiuQvRxbXJJaqloeGSinORiOpVPiQdYU0JV1jXL5HrNUOMpQ9eyIEVuALmqfQN1UepPEx7pGVLq2Ac1CVE0zdNEksWQdc/dEeMRWoHqmqypUjYCz2Z5Gfgy0HO25jXkB3QySUiOz/myef9CdzEPG2Efn7RahchgcsD0lD62/Gtn++/4poPuE6im/TsDkJzfE+Pu99WPhdO9eAI3a50agz7lGmUvUXmxvn7psqYqd5Y+G/nGmC+ohrkZARmWY7975mgIKKKCAAgoooHWgP8W6bKpfJZOHAAAAAElFTkSuQmCC',2,1,1);
/*!40000 ALTER TABLE `users_dpi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_etablissement`
--

DROP TABLE IF EXISTS `users_etablissement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_etablissement` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_etablissement`
--

LOCK TABLES `users_etablissement` WRITE;
/*!40000 ALTER TABLE `users_etablissement` DISABLE KEYS */;
INSERT INTO `users_etablissement` VALUES (1,'CHU Tizi Ouzou','Tizi Ouzou'),(2,'xxxx','');
/*!40000 ALTER TABLE `users_etablissement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_hospitalisation`
--

DROP TABLE IF EXISTS `users_hospitalisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_hospitalisation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_entre` date NOT NULL,
  `date_sortie` date NOT NULL,
  `duree` varchar(50) NOT NULL,
  `certificat_medical` varchar(255) NOT NULL,
  `depense` decimal(10,2) NOT NULL,
  `status` varchar(20) NOT NULL,
  `dpi_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_hospitalisation_dpi_id_42a0009e_fk_users_dpi_id` (`dpi_id`),
  CONSTRAINT `users_hospitalisation_dpi_id_42a0009e_fk_users_dpi_id` FOREIGN KEY (`dpi_id`) REFERENCES `users_dpi` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_hospitalisation`
--

LOCK TABLES `users_hospitalisation` WRITE;
/*!40000 ALTER TABLE `users_hospitalisation` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_hospitalisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_image`
--

DROP TABLE IF EXISTS `users_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `donnee` longblob NOT NULL,
  `compte_rendu_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_image_compte_rendu_id_72ba2c24_fk_users_compterendu_id` (`compte_rendu_id`),
  CONSTRAINT `users_image_compte_rendu_id_72ba2c24_fk_users_compterendu_id` FOREIGN KEY (`compte_rendu_id`) REFERENCES `users_compterendu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_image`
--

LOCK TABLES `users_image` WRITE;
/*!40000 ALTER TABLE `users_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_infermier`
--

DROP TABLE IF EXISTS `users_infermier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_infermier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `groupe` varchar(20) NOT NULL,
  `etablissement_id` bigint NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `users_infermier_etablissement_id_cc338e5c_fk_users_eta` (`etablissement_id`),
  CONSTRAINT `users_infermier_etablissement_id_cc338e5c_fk_users_eta` FOREIGN KEY (`etablissement_id`) REFERENCES `users_etablissement` (`id`),
  CONSTRAINT `users_infermier_user_id_e05eb6c6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_infermier`
--

LOCK TABLES `users_infermier` WRITE;
/*!40000 ALTER TABLE `users_infermier` DISABLE KEYS */;
INSERT INTO `users_infermier` VALUES (1,'infBenziada','Fares','Matin',1,3),(2,'infAitahmed','Meriem','Midi',1,4),(3,'infGrine','Abderrahmane','Nuit',1,5);
/*!40000 ALTER TABLE `users_infermier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_laborantin`
--

DROP TABLE IF EXISTS `users_laborantin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_laborantin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `etablissement_id` bigint NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `users_laborantin_etablissement_id_5c91855d_fk_users_eta` (`etablissement_id`),
  CONSTRAINT `users_laborantin_etablissement_id_5c91855d_fk_users_eta` FOREIGN KEY (`etablissement_id`) REFERENCES `users_etablissement` (`id`),
  CONSTRAINT `users_laborantin_user_id_43eb4871_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_laborantin`
--

LOCK TABLES `users_laborantin` WRITE;
/*!40000 ALTER TABLE `users_laborantin` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_laborantin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_medcin`
--

DROP TABLE IF EXISTS `users_medcin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_medcin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `specialite` varchar(100) NOT NULL,
  `etablissement_id` bigint NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `users_medcin_etablissement_id_db0efe42_fk_users_etablissement_id` (`etablissement_id`),
  CONSTRAINT `users_medcin_etablissement_id_db0efe42_fk_users_etablissement_id` FOREIGN KEY (`etablissement_id`) REFERENCES `users_etablissement` (`id`),
  CONSTRAINT `users_medcin_user_id_b011119d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_medcin`
--

LOCK TABLES `users_medcin` WRITE;
/*!40000 ALTER TABLE `users_medcin` DISABLE KEYS */;
INSERT INTO `users_medcin` VALUES (1,'khadidja','medcin','generaliste',1,2),(2,'medlounnaci','hassina','something',1,6),(3,'medMessaoud','Amal','something',1,7),(4,'medFoudhili','khadidja','something',1,8);
/*!40000 ALTER TABLE `users_medcin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_medicament`
--

DROP TABLE IF EXISTS `users_medicament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_medicament` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_medicament`
--

LOCK TABLES `users_medicament` WRITE;
/*!40000 ALTER TABLE `users_medicament` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_medicament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_ordonnance`
--

DROP TABLE IF EXISTS `users_ordonnance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_ordonnance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `observation` longtext NOT NULL,
  `consultation_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_ordonnance_consultation_id_d6dc39ed_fk_users_con` (`consultation_id`),
  CONSTRAINT `users_ordonnance_consultation_id_d6dc39ed_fk_users_con` FOREIGN KEY (`consultation_id`) REFERENCES `users_consultation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_ordonnance`
--

LOCK TABLES `users_ordonnance` WRITE;
/*!40000 ALTER TABLE `users_ordonnance` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_ordonnance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_patient`
--

DROP TABLE IF EXISTS `users_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_patient` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `NSS` varchar(15) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `mutuelle` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `personne_a_contacter` longtext,
  `telephone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NSS` (`NSS`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `users_patient_user_id_5ff17cf1_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_patient`
--

LOCK TABLES `users_patient` WRITE;
/*!40000 ALTER TABLE `users_patient` DISABLE KEYS */;
INSERT INTO `users_patient` VALUES (1,'123456789012345','MESSAOUD','Amel','1990-01-01','Adresse Test','Test',NULL,'grine ','0555555555'),(2,'123456789','Lounnaci','Hassina','2004-08-23','Tizi Ouzou','/',9,'family','000000000000');
/*!40000 ALTER TABLE `users_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_radiologue`
--

DROP TABLE IF EXISTS `users_radiologue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_radiologue` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `etablissement_id` bigint NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `users_radiologue_etablissement_id_36fc13f4_fk_users_eta` (`etablissement_id`),
  CONSTRAINT `users_radiologue_etablissement_id_36fc13f4_fk_users_eta` FOREIGN KEY (`etablissement_id`) REFERENCES `users_etablissement` (`id`),
  CONSTRAINT `users_radiologue_user_id_42910029_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_radiologue`
--

LOCK TABLES `users_radiologue` WRITE;
/*!40000 ALTER TABLE `users_radiologue` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_radiologue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_resume`
--

DROP TABLE IF EXISTS `users_resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_resume` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_prochaine_consultation` date NOT NULL,
  `mesures_prises` longtext NOT NULL,
  `autres` longtext NOT NULL,
  `consultation_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_resume_consultation_id_72a91bd5_fk_users_consultation_id` (`consultation_id`),
  CONSTRAINT `users_resume_consultation_id_72a91bd5_fk_users_consultation_id` FOREIGN KEY (`consultation_id`) REFERENCES `users_consultation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_resume`
--

LOCK TABLES `users_resume` WRITE;
/*!40000 ALTER TABLE `users_resume` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_resume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_soin`
--

DROP TABLE IF EXISTS `users_soin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_soin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `observation` longtext NOT NULL,
  `dpi_id` bigint NOT NULL,
  `infermier_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_soin_dpi_id_331b09b7_fk_users_dpi_id` (`dpi_id`),
  KEY `users_soin_infermier_id_0b677ac7_fk_users_infermier_id` (`infermier_id`),
  CONSTRAINT `users_soin_dpi_id_331b09b7_fk_users_dpi_id` FOREIGN KEY (`dpi_id`) REFERENCES `users_dpi` (`id`),
  CONSTRAINT `users_soin_infermier_id_0b677ac7_fk_users_infermier_id` FOREIGN KEY (`infermier_id`) REFERENCES `users_infermier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_soin`
--

LOCK TABLES `users_soin` WRITE;
/*!40000 ALTER TABLE `users_soin` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_soin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_test`
--

DROP TABLE IF EXISTS `users_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_test` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `resultat` varchar(100) NOT NULL,
  `unite` varchar(50) NOT NULL,
  `autres` longtext NOT NULL,
  `bilan_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_test_bilan_id_c8120253_fk_users_bilan_id` (`bilan_id`),
  CONSTRAINT `users_test_bilan_id_c8120253_fk_users_bilan_id` FOREIGN KEY (`bilan_id`) REFERENCES `users_bilan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_test`
--

LOCK TABLES `users_test` WRITE;
/*!40000 ALTER TABLE `users_test` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_traitement`
--

DROP TABLE IF EXISTS `users_traitement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_traitement` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `duree` varchar(50) NOT NULL,
  `dosage` varchar(50) NOT NULL,
  `medicament_id` bigint NOT NULL,
  `ordonnance_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_traitement_medicament_id_47c15463_fk_users_medicament_id` (`medicament_id`),
  KEY `users_traitement_ordonnance_id_a9fc3eb1_fk_users_ordonnance_id` (`ordonnance_id`),
  CONSTRAINT `users_traitement_medicament_id_47c15463_fk_users_medicament_id` FOREIGN KEY (`medicament_id`) REFERENCES `users_medicament` (`id`),
  CONSTRAINT `users_traitement_ordonnance_id_a9fc3eb1_fk_users_ordonnance_id` FOREIGN KEY (`ordonnance_id`) REFERENCES `users_ordonnance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_traitement`
--

LOCK TABLES `users_traitement` WRITE;
/*!40000 ALTER TABLE `users_traitement` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_traitement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-07  1:10:54
