from flask import Flask, jsonify, request, send_from_directory
from solver import solve, time_solve
import requests
import os

env = "production"
app = Flask(__name__, static_url_path="/static")

@app.route('/solve', methods=['POST'])
def solve():
    json = request.get_json()

    if "grid" in json:
        grid = json['grid']
        result = time_solve(grid)
        return jsonify(result), 200
    return jsonify('bad request'), 400


if env == 'production':
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=4444, type=int, help='port to listen on')
    parser.add_argument('-e', '--env', default=env, type=str, help="env")
    args = parser.parse_args()
    port = args.port
    env = args.port

    app.run(host='0.0.0.0', debug=True, port=port)
