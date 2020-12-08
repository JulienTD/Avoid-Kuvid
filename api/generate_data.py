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
    def __init__(self,
                 name,
                 open_times,
                 description='Short description',
                 image='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
                 bookable=True):
        super().__init__()
        try:
            self.add_facility_impl(name, description, open_times, image, bookable)
        except Exception as e:
            print(e, file=sys.stderr)

class News(Database):
    def __init__(self, title, description):
        super().__init__()
        try:
            self.add_news_impl(title, description)
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
    Facility(name='bookable room',
             description='This is the description of the bookable room',
             open_times=[{"_from": "2:00", "to": "09:00"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=True
    )
    News("News title", "Description of the news.")
    News("Another news", "Another description of the news, but this time a bit longer.")
    
