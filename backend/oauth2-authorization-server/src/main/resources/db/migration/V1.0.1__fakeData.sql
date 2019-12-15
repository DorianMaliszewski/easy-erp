-- noinspection SqlNoDataSourceInspectionForFile

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO oauth_client_details
(client_id, resource_ids, client_secret, scope, authorized_grant_types,
 web_server_redirect_uri, authorities, access_token_validity,
 refresh_token_validity, additional_information, autoapprove)
VALUES
('easy-erp', 'quote-service,client-service,bill-service', '{bcrypt}$2a$10$/yeQ/KSwkoO4Tu4KZJf5TONHcSg.wU/OxC20aTWDo8a5cjOpDvUMu', 'read,write',
 'password,refresh_token', null, null, 36000, 36000, null, false);
INSERT INTO oauth_client_details
(client_id, resource_ids, client_secret, scope, authorized_grant_types,
 web_server_redirect_uri, authorities, access_token_validity,
 refresh_token_validity, additional_information, autoapprove)
VALUES
('api', 'quote-service,client-service,bill-service', '{bcrypt}$2a$10$FRHjpO44PdujGAJS8qxgjuku3svZxUsSZHOHsJwX5Pkgn7VuAdZRy', 'read',
 'password', null, null, 36000, 36000, null, false);

--
-- User data
--
LOCK TABLES `permission` WRITE;
INSERT INTO permission (id, name) VALUES (1,'CAN_DELETE_USER'),(2,'CAN_CREATE_USER'),(3,'CAN_UPDATE_USER'),(4,'CAN_READ_USER'), (5,'CAN_DELETE_CLIENT'), (6, 'CAN_CREATE_CLIENT'), (7, 'CAN_UPDATE_CLIENT');
UNLOCK TABLES;

LOCK TABLES `role` WRITE;
INSERT INTO role (id, name) VALUES (1,'ROLE_SUPER_ADMIN'),(2,'ROLE_ADMIN'),(3,'ROLE_MANAGER'),(4,'ROLE_USER'),(5,'ROLE_CLIENT');
UNLOCK TABLES;

INSERT INTO subscription (name, price) VALUES ('Core', 0), ('Starter', 30.0), ('Advanced', 45.0), ('Pro', 60.0), ('Enterprise', 100.0);

INSERT INTO tenant (version, name, phone, site, email, address, postal_code, instance_url, main_user_id, subscription_id) VALUES
(0, 'Mon Entreprise', '+33619755845', 'http://myenterprise.com', 'contact@myenterpise.com', '16, rue jean desparmet', '69007', 'http://api.easy-erp.lan', 1, 4);

LOCK TABLES `oauth_user` WRITE;
INSERT INTO oauth_user (username, password, email, first_name, last_name, role_id, tenant_id) VALUES
('superadmin','{bcrypt}$2a$10$iKqpJr8SMpTG70whcnWKl.5jhAXjjsbwCr.0fFkDBsA9lCbWgvh4i','maliszewskid3@gmail.com','Super Administrateur', 'Super Administrateur', 1, 1),
('admin','{bcrypt}$2a$10$iKqpJr8SMpTG70whcnWKl.5jhAXjjsbwCr.0fFkDBsA9lCbWgvh4i','admin@exemple.com','Administrateur', 'Administrateur', 2, 1),
('user','{bcrypt}$2a$10$FVd/WcOPdDU.k8Z4MmSyZOgfz0/r1lViAScSSK/Tr.MWyzO3OLuSW','user@exemple.com','Utilisateur','Utilisateur',3, 1);
UNLOCK TABLES;

SET FOREIGN_KEY_CHECKS=1;
