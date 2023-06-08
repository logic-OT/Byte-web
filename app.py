import json
import os
import warnings
from datetime import datetime
from http.client import HTTPException
from io import BytesIO
import os.path
from scipy.signal import resample
from scipy.io.wavfile import read
import numpy as np
from flask import Flask, send_from_directory, send_file, jsonify, Response
from flask import request, redirect
from flask_cors import CORS, cross_origin
from gevent.pywsgi import WSGIServer
from pydub import AudioSegment
from decode.demodulator import demodulator
from encode.modulator import get_data


static_dir='./website'
static_dir = os.path.abspath(static_dir)
app = Flask(__name__,static_folder=static_dir)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.debug = True
warnings.filterwarnings("ignore")


class ServerError(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        error_dict = dict(self.payload or ())
        error_dict['message'] = self.message
        return error_dict

from scipy.io.wavfile import write
def write_wav(blob):
    buf = BytesIO()
    opus_data = BytesIO(blob)
    audio = AudioSegment.from_file(opus_data)
    duration = audio.duration_seconds
    audio = audio.set_frame_rate(10000)
    return audio.export(buf, format='wav')

@app.route('/')
def index() -> Response:  # pylint: disable=unused-variable
    return send_file(os.path.join(static_dir, 'home.html'))

@app.route('/<path:path>')
def static_proxy(path: str) -> Response:
    if static_dir is not None:
        return send_from_directory(static_dir, path)
    else:
        return send_file(os.path.join(static_dir, 'index.html'))

@app.route('/receive', methods=["GET"])
def receive():
    return send_file(os.path.join(static_dir, 'index.html'))


@app.route('/asr', methods=['POST'])
@cross_origin()
def demodulate():
    if request.method == 'POST':
        wav = write_wav(request.data)
        sr,data = read(wav)
        message = demodulator(data)
        res = {'result': message}
        return json.dumps(res, ensure_ascii=False)
    return "ASR"

@app.route('/encode/<path:message>', methods=["GET"])
def encode(message):
    blob = get_data(message)
    return blob

@app.route('/transmit', methods=["GET"])
def transmit():
    return send_file(os.path.join(static_dir, 'send.html'))

'''
@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    return jsonify(error=str(e)), code
'''

if __name__ == "__main__":
    app.run()
