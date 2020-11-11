FLASK_HOST = '0.0.0.0'
FLASK_PORT = 5000
FLASK_DEBUG = False
FLASK_THREADED = True

import os
ENV_SETUP = os.getenv('MONGO_DATABASE', None) is not None#os.environ['MONGO_DATABASE'] is not None
MONGO_DATABASE = os.getenv('MONGO_DATABASE', 'avoid_kuvid')
MONGO_ROOT_USERNAME = os.getenv('MONGO_ROOT_USERNAME', 'admin')
MONGO_ROOT_PASSWORD = os.getenv('MONGO_ROOT_PASSWORD', 'admin')
MONGO_API = f'mongodb://{MONGO_ROOT_USERNAME}:{MONGO_ROOT_PASSWORD}@db:27017/{MONGO_DATABASE}' if ENV_SETUP else "mongodb://localhost:27017/"
