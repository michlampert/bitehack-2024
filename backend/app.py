import time

from flask import Flask

app = Flask(__name__)

def get_hit_count():
    retries = 5
    return 0

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
