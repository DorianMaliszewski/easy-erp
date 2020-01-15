USE ez_bill;

DROP TABLE IF EXISTS bill_pdf;
CREATE TABLE bill_pdf (
                       id bigint(20) unsigned auto_increment primary key,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT NULL,
                       version int DEFAULT 0,
                       created_by varchar(255) DEFAULT NULL,
                       file_name varchar(255) DEFAULT NULL,
                       bill_id bigint(20) unsigned DEFAULT NULL,
                       bill_version int unsigned DEFAULT NULL,
                       FOREIGN KEY (bill_id) REFERENCES bill(id)
);