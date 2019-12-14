USE ez_client;

DROP TABLE IF EXISTS client;
CREATE TABLE client (
    id bigint(20) unsigned auto_increment primary key,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL,
    version int DEFAULT 0,
    name varchar(255) default null,
    contact bigint(20) unsigned default null,
    phone varchar(255) default null,
    email varchar(255) default null,
    site varchar(255) default null,
    city varchar(255) default null,
    address varchar(255) default null,
    postal_code varchar(255) default null,
    enabled bit(1) default 1,
    deleted bit(1) default 0,
    created_by bigint(20) unsigned default null
);