#%%

import logging
from logging.handlers import RotatingFileHandler
import traceback
import flask
from flask import request, jsonify, render_template
from flask_cors import CORS
from waitress import serve
import time
import json
import queue
import os

config = {"DEBUG": True}  # some Flask specific configs
sensors = dict()

app = flask.Flask(__name__)
CORS(app)


@app.route("/")
def hello_there():
    return render_template("index.html", message=sensors)

@app.route("/favicon.ico")
def serve_favicon():
    return app.send_static_file("favicon.ico")

@app.route("/sensors", methods=["POST"])
def parse_data():
    data: dict = request.get_json()
    node_name = data["node_name"]
    sensors[node_name] = dict()
    for key, value in data.items():
        sensors[node_name][key] = value
    sensors["updated"] = time.asctime()
    print("New sensors dict:", sensors)
    return jsonify(data), 200

@app.route("/sensors", methods=["GET"])
def get_readings():
    return jsonify(sensors), 200


"""
@app.route("/")
def hello_there():
    print(f"{time.asctime()} Received request for {request.url} from {request.remote_addr}")
    return (
            f"<html><body style='font-size: 4rem;'> \
        Temperatur: {sensors['temperature']}° C </br> \
        Fukthalt: {sensors['humidity']}% </br> \
        Känns som: {sensors['feels_like']}° C </br> \
        </body></html>",
        200,
    )
"""


@app.after_request
def after_request(response):
    timestamp = time.strftime("[%Y-%b-%d %H:%M]")
    logger.info(
        "%s %s %s %s %s",
        timestamp,
        request.remote_addr,
        request.method,
        request.url,
        response.status,
    )
    return response


if __name__ == "__main__":
    handler = RotatingFileHandler("app.log", maxBytes=100000, backupCount=3)
    logger = logging.getLogger("tdm")
    logger.setLevel(logging.INFO)
    logger.addHandler(handler)

    pp = int(os.environ.get("PORT", 5000))
    print(f"Flask app listening on http://0.0.0.0:{pp}")
    serve(app, host="0.0.0.0", port=pp)
