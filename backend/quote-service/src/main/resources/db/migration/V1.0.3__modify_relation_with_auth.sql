ALTER TABLE quote MODIFY COLUMN created_by varchar(255) default null;

UPDATE quote set created_by = 'admin';