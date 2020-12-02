import sys
from database import Database

class User(Database):
    def __init__(self, email, password, _type='student'):##student, staff,
        super().__init__()
        try:
            self.register(email, password)
        except Exception as e:
            print(e, file=sys.stderr)

class Facility(Database):
    def __init__(self, name, open_times, description='Short description', image='https://example.com/image.png', bookable=True):
        super().__init__()
        try:
            self.add_facility(name, description, open_times, image, bookable)
        except Exception as e:
            print(e, file=sys.stderr)

def generate_data():
    User('normal.user@test.test', 'abcd')
    User('staff@test.test', 'abcd', 'staff')
    Facility(name='cafeteria',
             description='This is the description of the cafeteria',
             open_times=[{"_from": "03:00", "to": "05:30"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=False
    )
    Facility(name='test room',
             description='This is the description of the test room',
             open_times=[{"_from": "10:00", "to": "11:00"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=False
    )
