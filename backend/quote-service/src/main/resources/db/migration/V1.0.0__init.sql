USE ez_quote;

DROP TABLE IF EXISTS quote;
CREATE TABLE quote (
    id bigint(20) unsigned auto_increment primary key,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL,
    version int DEFAULT 0,
    status varchar(50) DEFAULT NULL,
    total double DEFAULT NULL,
    created_by bigint(20) unsigned DEFAULT NULL,
    client_id bigint(20) unsigned DEFAULT NULL,
    deleted bit(1) DEFAULT 0
)