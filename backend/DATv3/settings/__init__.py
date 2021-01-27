import os
try:
    DJANGO_ENV = os.environ.get("DJANGO_ENV")
except:
    DJANGO_ENV = 'dev'

if DJANGO_ENV == 'development':
    from .dev import *
elif DJANGO_ENV == 'production':
    from .prod import *
else:
    from .dev import *
