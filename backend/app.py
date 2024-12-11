from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from admin import setup_admin
from models import db


# Inicializa FLask

app = Flask(__name__)



CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:tu_contraseña@localhost:5432/tu_base_datos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
setup_admin(app)

# Ruta de prueba

@app.route('/',methods=['GET'])
def saludo():
    return jsonify({"mensaje": "Hola desde Flask"})

#inicializa la aplicacion

if __name__ == '__main__':
    app.run(debug=True)
