from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from admin import setup_admin
from models import db

# Inicializa Flask
app = Flask(__name__)

# Configura la aplicación
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:tu_contraseña@localhost:5432/tu_base_datos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa extensiones
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)
setup_admin(app)

# Ruta de prueba
@app.route('/', methods=['GET'])
def saludo():
    return jsonify({"mensaje": "Hola desde Flask"})

# Inicializa la aplicación
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Crea las tablas
    app.run(debug=True)
