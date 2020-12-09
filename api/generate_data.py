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

    Facility(name='Cafeteria',
             description='This is the description of the cafeteria',
             open_times=[{"_from": "03:00", "to": "05:30"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=False
    )

    Facility(name='Futurus study room 3100',
             description='This is the description of the futurus study room 3100',
             open_times=[{"_from": "03:00", "to": "05:30"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=True
    )
    Facility(name='Futurus study room 3200',
             description='This is the description of the futurus study room 3200',
             open_times=[{"_from": "03:00", "to": "05:30"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=True
    )
    Facility(name='Futurus study room 3300',
             description='This is the description of the futurus study room 3300',
             open_times=[{"_from": "03:00", "to": "05:30"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=True
    )

    Facility(name='Futurus eating room',
             description='This is the description of the futurus eating room',
             open_times=[{"_from": "03:00", "to": "05:30"}],##!!!!!!!!!heures en utc!!!!!!!!
             bookable=False
    )

    News("COVID-19 Announcement", "The social distancing level in the greater Seoul area will be placed under level 2.5, the second highest in the country's five-tier COVID-19 alert system starting from today for the next three weeks, with other parts of the nation including Sejong City under level 2")
    News("News title", "Description of the news.")
    News("Another news", "Another description of the news, but this time a bit longer.")
