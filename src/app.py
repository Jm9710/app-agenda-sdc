from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto habilita CORS para permitir solicitudes desde React

@app.route("/api/data", methods=["GET"])
def get_data():
    # Datos simulados para enviar al frontend
    data = {"message": "¡Hola desde Flask!", "success": True}
    return jsonify(data)

@app.route("/api/data", methods=["POST"])
def post_data():
    # Procesar datos enviados desde React
    received_data = request.json
    response = {"received": received_data, "status": "success"}
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
