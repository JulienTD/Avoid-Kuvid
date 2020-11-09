from flask import Flask, jsonify, request#, send_file
from flask_cors import CORS

import config
import utils

import jwt
import datetime

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
        mytest_db.register(request.json['email'], request.json['password'])
        token = jwt.encode({'user': request.json['email'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config["SECRET_KEY"])
        return jsonify({'success': True, 'message': f"Successfully registered new user with email '{request.json['email']}'", 'token': token.decode('UTF-8')})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)})

@app.route('/login', methods=['POST'])
def login():
    try:
        utils.check_dict(request.json, ('email', 'password'))
        mytest_db.login(request.json['email'], request.json['password'])
        token = jwt.encode({'user': request.json['email'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config["SECRET_KEY"])
        return jsonify({'success': True, 'message': f"Successfully logged in with email '{request.json['email']}'", 'token': token.decode('UTF-8')})
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify({'success': False, 'message': str(e)})

if __name__ == "__main__":
    app.run(host=config.FLASK_HOST,
            port=config.FLASK_PORT,
            debug=config.FLASK_DEBUG,
            threaded=config.FLASK_THREADED
    )
