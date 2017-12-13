

from flask import Flask, jsonify, request, send_from_directory

from solver import solve, time_solve

app = Flask(__name__, static_folder='build/static')


@app.route('/solve', methods=['POST'])
def solve():
    json = request.get_json()

    if "grid" in json:
        grid = json['grid']

        result = time_solve(grid)

        return jsonify(result), 200

    return jsonify('bad request'), 400


@app.route('/', methods=['get'])
def serve():

    return send_from_directory('build', 'index.html')


if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port, threaded = True, use_reloader = True)
