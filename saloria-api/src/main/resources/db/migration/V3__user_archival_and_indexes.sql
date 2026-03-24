ALTER TABLE app_users ADD COLUMN IF NOT EXISTS archived BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_app_users_enterprise_role_archived
  ON app_users (enterprise_id, role, archived);

CREATE INDEX IF NOT EXISTS idx_app_users_email_archived
  ON app_users (email, archived);

CREATE INDEX IF NOT EXISTS idx_appointments_enterprise_date
  ON appointments (enterprise_id, date);

CREATE INDEX IF NOT EXISTS idx_appointments_employee_date
  ON appointments (employee_id, date);

CREATE INDEX IF NOT EXISTS idx_appointments_customer_date
  ON appointments (customer_id, date);

CREATE INDEX IF NOT EXISTS idx_appointments_enterprise_status_date
  ON appointments (enterprise_id, status, date);

CREATE INDEX IF NOT EXISTS idx_appointments_enterprise_paid_date
  ON appointments (enterprise_id, paid, date);

CREATE INDEX IF NOT EXISTS idx_customers_enterprise_phone
  ON customers (enterprise_id, phone);

CREATE INDEX IF NOT EXISTS idx_customers_enterprise_user
  ON customers (enterprise_id, user_id);

CREATE INDEX IF NOT EXISTS idx_service_offerings_enterprise_deleted
  ON service_offerings (enterprise_id, deleted);

CREATE INDEX IF NOT EXISTS idx_working_hours_enterprise_user_day
  ON working_hours (enterprise_id, user_id, "day");
