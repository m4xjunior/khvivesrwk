
from flask import Flask
from flask_smorest import Api
from blueprints.ford import ford_bp
from blueprints.entorno import entorno_bp
import config

app = Flask(__name__)

# Load configuration
app.config.from_object(config.Config)

# Initialize API
api = Api(app)
api.register_blueprint(ford_bp)
api.register_blueprint(entorno_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=app.config['PORT'])
