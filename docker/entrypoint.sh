#!/bin/sh
set -e

# Create log directories
mkdir -p /var/log/php /var/log/supervisor /var/log/nginx

# Wait for database to be ready
echo "Waiting for PostgreSQL..."
while ! nc -z ${DB_HOST:-postgres} ${DB_PORT:-5432}; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Run Laravel setup commands
cd /var/www/html

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Run migrations
php artisan migrate --force

# Clear and cache config for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Link storage
php artisan storage:link --force 2>/dev/null || true

echo "Application is ready!"

# Start supervisord
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
