

from flask import Flask, jsonify, request

from solver import solve, time_solve

app = Flask(__name__)


@app.route('/api/solve', methods=['POST'])
def solve():
    json = request.get_json()

    print(json)

    grid = json['grid']

    t = time_solve(grid)

    d = t[2]

    return jsonify(d), 200


if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
