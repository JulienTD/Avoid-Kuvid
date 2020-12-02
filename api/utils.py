import random
import string
import jwt
import datetime
import re

import config

def generate_secret_key():
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))

def check_dict(dct: dict, values: tuple):
    if not all(_ in dct for _ in values):
        raise Exception("Please provide all informations")

def create_token(email, secret_key):
    return jwt.encode({'user': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, secret_key)

def get_email_from_token(token, secret_key):
    decoded_token = jwt.decode(token, secret_key)
    if 'user' not in decoded_token:
        raise Exception("Invalid jwt token")
    return decoded_token['user']

def validate_email(email):
    if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
        raise Exception("Invalid email")
