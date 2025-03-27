from flask import Flask
from flask_cors import CORS

# Import the Blueprints from the routes directory
from routes.home import home_bp
from routes.payments import payments_bp
from routes.graphql import graphql_bp

app = Flask(__name__)
CORS(app)

# Register the Blueprints
app.register_blueprint(home_bp)
app.register_blueprint(payments_bp)
app.register_blueprint(graphql_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
