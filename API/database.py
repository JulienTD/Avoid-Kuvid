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

    def register(self, username, password):
        existing_user = self.users.find_one({'username': username})
        if existing_user:
            raise Exception(f"User '{username}' already exists.")
        #print(f'username: {username}, password: {password}', file=sys.stderr)
        hashpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        #print(f'hashpass: {hashpass}', file=sys.stderr)
        self.users.insert({'username': username, 'password': hashpass})

    """def get_users(self):
        users = list(self.users.find({}))
        for user in users:##filter the users result before with a mongo command??
            del user['_id']
            del user['password']
        return users"""
