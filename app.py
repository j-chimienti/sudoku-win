from flask import Flask, jsonify, request, send_from_directory, render_template

from solver import solve, time_solve

import os

app = Flask(__name__)


@app.route('/solve', methods=['POST'])
def solve():
    json = request.get_json()

    if "grid" in json:
        grid = json['grid']

        result = time_solve(grid)

        return jsonify(result), 200

    return jsonify('bad request'), 400


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print('you requested {}'.format(path))

    from subprocess import call
    call(["ls", "-l"])

    return send_from_directory('build', 'index.html')


if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', debug=True, port=port)
