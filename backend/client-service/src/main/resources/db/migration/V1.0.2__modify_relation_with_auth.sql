ALTER TABLE client MODIFY COLUMN created_by varchar(255) default null;
ALTER TABLE client MODIFY COLUMN contact varchar(255) default null;

UPDATE client SET created_by = 'admin';
UPDATE client SET contact = 'admin';