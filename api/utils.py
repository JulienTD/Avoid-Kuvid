import random
import string

import config

def generate_secret_key():
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))

def check_dict(dct: dict, values: tuple):
    if not all(_ in dct for _ in values):
        raise Exception("Please provide all informations")
