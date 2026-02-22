ALTER TABLE app_users ADD COLUMN created_at TIMESTAMP;
ALTER TABLE app_users ADD COLUMN updated_at TIMESTAMP;
ALTER TABLE app_users ADD COLUMN created_by VARCHAR(255);
ALTER TABLE app_users ADD COLUMN updated_by VARCHAR(255);

ALTER TABLE enterprises ADD COLUMN created_at TIMESTAMP;
ALTER TABLE enterprises ADD COLUMN updated_at TIMESTAMP;
ALTER TABLE enterprises ADD COLUMN created_by VARCHAR(255);
ALTER TABLE enterprises ADD COLUMN updated_by VARCHAR(255);

ALTER TABLE appointments ADD COLUMN created_at TIMESTAMP;
ALTER TABLE appointments ADD COLUMN updated_at TIMESTAMP;
ALTER TABLE appointments ADD COLUMN created_by VARCHAR(255);
ALTER TABLE appointments ADD COLUMN updated_by VARCHAR(255);

ALTER TABLE customers ADD COLUMN created_at TIMESTAMP;
ALTER TABLE customers ADD COLUMN updated_at TIMESTAMP;
ALTER TABLE customers ADD COLUMN created_by VARCHAR(255);
ALTER TABLE customers ADD COLUMN updated_by VARCHAR(255);

ALTER TABLE service_offerings ADD COLUMN created_at TIMESTAMP;
ALTER TABLE service_offerings ADD COLUMN updated_at TIMESTAMP;
ALTER TABLE service_offerings ADD COLUMN created_by VARCHAR(255);
ALTER TABLE service_offerings ADD COLUMN updated_by VARCHAR(255);

ALTER TABLE working_hours ADD COLUMN created_at TIMESTAMP;
ALTER TABLE working_hours ADD COLUMN updated_at TIMESTAMP;
ALTER TABLE working_hours ADD COLUMN created_by VARCHAR(255);
ALTER TABLE working_hours ADD COLUMN updated_by VARCHAR(255);
