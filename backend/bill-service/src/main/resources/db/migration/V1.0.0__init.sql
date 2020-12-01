USE ez_bill;

CREATE TABLE bill (
    id bigint(20) unsigned auto_increment primary key,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL,
    version int DEFAULT 0,
    status varchar(50) DEFAULT NULL,
    total DOUBLE DEFAULT NULL,
    tva DOUBLE DEFAULT 0,
    created_by BIGINT(20) DEFAULT NULL,
    client_id BIGINT(20) DEFAULT NULL,
    locked BIT(1) DEFAULT 0,
    deleted BIT(1) DEFAULT 0
);


CREATE TABLE bill_line (
    bill_id BIGINT UNSIGNED NOT NULL,
    line_number INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL,
    version int DEFAULT 0,
    description VARCHAR(255) DEFAULT NULL,
    quantity INT DEFAULT 0,
    pre_tax_price DOUBLE DEFAULT 0,
    PRIMARY KEY (bill_id, line_number),
    FOREIGN KEY (bill_id) REFERENCES bill (id)
);