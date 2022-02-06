#! /bin/env python3

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
# Global variable holding all the sensor data
sensor_data = dict()


app = flask.Flask(__name__)
CORS(app)


@app.route("/")
def root():
    return render_template("index.html", message=sensor_data)


@app.route("/favicon.ico")
def serve_favicon():
    return app.send_static_file("favicon.ico")


@app.route("/sensors", methods=["POST"])
def parse_data():
    data: dict = request.get_json()
    node_name = data["node_name"]
    if node_name not in sensor_data:
        print(f"sensor_data[{node_name}] was not in sensor_data dict")
        sensor_data[node_name] = dict()
        sensor_data[node_name]["current_day"] = time.localtime()[2]
    elif sensor_data[node_name]["current_day"] != time.localtime()[2]:
        # Is there a smarter way to do this? If i add an `or` to the previous if statement, there'll
        # be a KeyError.
        print(f"New day for sensor_data[{node_name}]")
        sensor_data[node_name] = dict()
        sensor_data[node_name]["current_day"] = time.localtime()[2]
    for key, value in data.items():
        sensor_data[node_name][key] = value
    sensor_data["updated"] = time.asctime()
    if "min" not in sensor_data[node_name]:
        print(f"min not in {sensor_data[node_name]}", "min" not in sensor_data[node_name])
        sensor_data[node_name]["min"] = data["temperature"]
    if "max" not in sensor_data[node_name]:
        print(f"max not in {sensor_data[node_name]}", "max" not in sensor_data[node_name])
        sensor_data[node_name]["max"] = data["temperature"]

    if sensor_data[node_name]["min"] > data["temperature"]:
        sensor_data[node_name]["min"] = data["temperature"]

    if sensor_data[node_name]["max"] < data["temperature"]:
        sensor_data[node_name]["max"] = data["temperature"]

    print("New sensors dict:", sensor_data)
    return jsonify(data), 200

@app.route("/api/v1/sensors/<sensor>")
def get_sensor(sensor):
    if sensor not in sensor_data:
        return f"Sensor {sensor} not found", 404
    return jsonify(sensor_data[sensor]), 200

@app.route("/api/v1/sensors", methods=["GET"])
def get_readings():
    return jsonify(sensor_data), 200


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
