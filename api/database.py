from pymongo import MongoClient, DESCENDING
import bcrypt

import sys

import config

class Database:
    def __init__(self):
        self.client = MongoClient(host=config.MONGO_API)
        self.mydb = self.client[config.MONGO_DATABASE]
        self.users = self.mydb.users

    def __del__(self):
        self.client.close()

    def register(self, email, password):
        existing_user = self.users.find_one({'email': email})
        if existing_user:
            raise Exception(f"User '{email}' already exists.")
        hashpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.users.insert({'email': email, 'password': hashpass})

