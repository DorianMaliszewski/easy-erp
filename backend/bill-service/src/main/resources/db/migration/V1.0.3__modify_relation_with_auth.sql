ALTER TABLE bill MODIFY COLUMN created_by varchar(255) default null;

UPDATE bill SET created_by = "admin";