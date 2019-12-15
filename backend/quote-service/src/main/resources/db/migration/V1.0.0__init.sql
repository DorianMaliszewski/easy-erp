USE ez_quote;

DROP TABLE IF EXISTS quote;
CREATE TABLE quote (
    id bigint(20) unsigned auto_increment primary key,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL,
    version int DEFAULT 0,
    status varchar(50) DEFAULT NULL,
    total double DEFAULT NULL,
    tva double DEFAULT 0,
    created_by bigint(20) unsigned DEFAULT NULL,
    client_id bigint(20) unsigned DEFAULT NULL,
    deleted bit(1) DEFAULT 0
);

CREATE TABLE quote_line (
    quote_id BIGINT UNSIGNED NOT NULL,
    line_number INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL,
    version int DEFAULT 0,
    description VARCHAR(255) DEFAULT NULL,
    quantity INT DEFAULT 0,
    pre_tax_price DOUBLE DEFAULT 0,
    PRIMARY KEY (quote_id, line_number),
    FOREIGN KEY (quote_id) REFERENCES quote(id)
);