#!/bin/sh
# if [ "$DATABASE" = "postgres" ]
# then
#     echo "Waiting for postgres..."
    
#     while ! nc -z $DB_HOST $DB_PORT; do
#       sleep 0.1
#     done
    
#     echo "PostgreSQL started"
# fi

python manage.py collectstatic --noinput
python manage.py migrate

echo "import django.contrib.auth;
User = django.contrib.auth.get_user_model();
User.objects.filter(email='$DJANGO_ADMIN_EMAIL').delete();

# if User.objects.filter(username='${SUPERUSER_NAME}').count() == 0:
#     User.objects.create_superuser('$DJANGO_ADMIN_USER', '$DJANGO_ADMIN_EMAIL', '$DJANGO_ADMIN_PASSWORD')
#     print('Superuser created.');
if not User.objects.filter(username='${DJANGO_ADMIN_USER}').exists():
    User.objects.create_superuser('$DJANGO_ADMIN_USER', '$DJANGO_ADMIN_EMAIL', '$DJANGO_ADMIN_PASSWORD')
    print('Superuser created.');
else:
    print('Superuser creation skipped.');" | python manage.py shell

exec "$@"