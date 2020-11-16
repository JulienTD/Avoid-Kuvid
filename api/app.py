from flask import Flask, jsonify, request#, send_file
from flask_cors import CORS

import config
import utils

import sys

from database import Database

app = Flask(__name__)
app.config['SECRET_KEY'] = utils.generate_secret_key()
CORS(app)

mytest_db = Database()

@app.route('/', methods=['GET'])
def home():
    return jsonify({'success': True})

@app.route('/register', methods=['POST'])
def register():
    try:
        utils.check_dict(request.json, ('email', 'password'))
        mytest_db.register(**request.json)
        token = utils.create_token(request.json['email'], app.config["SECRET_KEY"])
        return jsonify({'success': True, 'message': f"Successfully registered new user with email '{request.json['email']}'", 'token': token.decode('UTF-8')})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)}), 205

@app.route('/login', methods=['POST'])
def login():
    try:
        utils.check_dict(request.json, ('email', 'password'))
        mytest_db.login(**request.json)
        token = utils.create_token(request.json['email'], app.config["SECRET_KEY"])
        return jsonify({'success': True, 'message': f"Successfully logged in with email '{request.json['email']}'", 'token': token.decode('UTF-8')})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)}), 205


##only for us, not for the user
@app.route('/add_facility', methods=['POST'])
def add_facility():
    try:
        utils.check_dict(request.json, ('token', 'name', 'description', 'open_times'))

        email = utils.get_email_from_token(request.json['token'], app.config["SECRET_KEY"])
        if email != "admin@admin.admin":##hardcoded!!!, compare type instead
            raise Exception("User not allowed")
        mytest_db.add_facility(**request.json)

        return jsonify({'success': True, 'message': "Successfully added facility"})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)}), 205

@app.route('/get_facilities', methods=['POST'])
def get_facilities():
    try:
        utils.check_dict(request.json, ('token',))

        email = utils.get_email_from_token(request.json['token'], app.config["SECRET_KEY"])
        facilities = mytest_db.get_facilities()

        return jsonify({'success': True, 'message': "Successfully got facilities", 'facilities': facilities})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)}), 205

@app.route('/get_facility_info', methods=['POST'])
def get_facility_info():
    try:
        utils.check_dict(request.json, ('token', 'name'))

        email = utils.get_email_from_token(request.json['token'], app.config["SECRET_KEY"])
        facility = mytest_db.get_facility_info(request.json['name'])

        return jsonify({'success': True, 'message': "Successfully retrieved facility info", 'facility': facility})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)}), 205

@app.route('/book_facility', methods=['POST'])
def book_facility():
    try:
        utils.check_dict(request.json, ('token', 'name', '_from', 'to'))

        email = utils.get_email_from_token(request.json['token'], app.config["SECRET_KEY"])
        mytest_db.book_facility(email, **request.json)

        return jsonify({'success': True, 'message': f"Successfully booked facility ({request.json['name']}) from {request.json['_from']} to {request.json['to']}"})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)}), 205

@app.route('/set_facility_status', methods=['POST'])
def set_facility_status():
    try:
        utils.check_dict(request.json, ('token', 'closed', 'name'))

        email = utils.get_email_from_token(request.json['token'], app.config["SECRET_KEY"])
        mytest_db.set_facility_status(email, request.json['name'], request.json['closed'])

        return jsonify({'success': True, 'message': f"Successfully changed facility status"})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)}), 205


if __name__ == "__main__":
    app.run(host=config.FLASK_HOST,
            port=config.FLASK_PORT,
            debug=config.FLASK_DEBUG,
            threaded=config.FLASK_THREADED
    )
