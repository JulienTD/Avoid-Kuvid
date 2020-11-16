from pymongo import MongoClient, DESCENDING
import bcrypt
import datetime
import sys

import config
import utils

class Database:
    def __init__(self):
        self.client = MongoClient(host=config.MONGO_API)
        self.mydb = self.client[config.MONGO_DATABASE]
        self.users = self.mydb.users
        self.facilities = self.mydb.facilities

    def __del__(self):
        self.client.close()

    def register(self, email, password):
        existing_user = self.users.find_one({'email': email})
        if existing_user:
            raise Exception(f"User '{email}' already exists.")
        utils.validate_email(email)
        hashpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.users.insert({'email': email, 'password': hashpass, 'type': 'student'})

    def login(self, email, password):
        existing_user = self.users.find_one({'email': email})
        if existing_user:
            if bcrypt.hashpw(password.encode('utf-8'), existing_user['password']) == existing_user['password']:
                return True
            else:
                raise Exception(f"Wrong password for email '{email}'.")
        raise Exception(f"Email '{email}' not registered.")

    def get_facilities(self):
        return list(self.facilities.find({}, {'_id': 0}))

    def get_facility_info(self, facility_name):
        facility = self.facilities.find_one({'name': facility_name}, {'_id': 0})
        if not facility:
            raise Exception(f"Could not find facility {facility_name}")
        to_datetime = lambda _str : datetime.datetime.strptime(_str, '%d-%m-%Y %H:%M')
        facility['booked']  = [booked for booked in facility['booked'] if to_datetime(booked['to']) >= datetime.datetime.utcnow()]
        return facility

    def set_facility_status(self, email, name, closed):
        existing_user = self.users.find_one({'email': email})
        if not existing_user:
            raise Exception("Could not find user")
        if existing_user['type'] != 'staff':
            raise Exception("Only staff members can change the facility status")

        facility = self.facilities.find_one({'name': name})
        if not facility:
            raise Exception(f"Facility '{name}' already exists")
        myquery = {'name': name}
        newvalues = {'$set': {'closed': closed}}
        self.facilities.update_one(myquery, newvalues)

    def add_facility(self, name, description, open_times, **args):
        ##check if admin!!!
        facility = self.facilities.find_one({'name': name})
        if facility:
            raise Exception(f"Facility '{name}' already exists")
        self.facilities.insert({'name': name,
                                'description': description,
                                'open_times': open_times,##{"_from": "10:00", "to": "11:00"}
                                'booked': [],##{"_from": "10:00", "to": "11:00", by: ["user_id"]}
                                'closed': []##{"_from": "10:00", "to": "11:00", "reason": "hollidays"}
        })

    def book_facility(self, email, name, _from, to, **args):
        to_datetime = lambda _str : datetime.datetime.strptime(_str, '%d-%m-%Y %H:%M')

        if to_datetime(_from) >= to_datetime(to):
            raise Exception(f"{to} is before {_from}")
        if to_datetime(to) <= datetime.datetime.utcnow():
            raise Exception("Cannot book a facility in the past")

        facility = self.facilities.find_one({'name': name})
        if not facility:
            raise Exception(f"Facility '{name}' does not exist")

        is_inside = lambda slot, a : to_datetime(slot['_from']) <= to_datetime(a) <= to_datetime(slot['to'])

        for slot in facility['booked']:
            if is_inside(slot, _from) or is_inside(slot, to):
                raise Exception("Already booked")

        facility['booked'].append({'_from': _from, 'to': to, 'by': [email]})##user_id instead of email!!

        myquery = {'name': name}
        newvalues = {'$set': {'booked': facility['booked']}}
        self.facilities.update_one(myquery, newvalues)
