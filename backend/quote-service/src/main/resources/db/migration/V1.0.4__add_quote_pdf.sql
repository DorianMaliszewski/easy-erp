USE ez_quote;

DROP TABLE IF EXISTS quote_pdf;
CREATE TABLE quote_pdf (
                       id bigint(20) unsigned auto_increment primary key,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT NULL,
                       version int DEFAULT 0,
                       created_by varchar(255) DEFAULT NULL,
                       file_name varchar(255) DEFAULT NULL,
                       quote_id bigint(20) unsigned DEFAULT NULL,
                       quote_version int unsigned DEFAULT NULL,
                       FOREIGN KEY (quote_id) REFERENCES quote(id)
);