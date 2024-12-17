from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from admin import setup_admin
from models import db, Usuario, Cliente, Estado, TipoTrabajo


# Inicializa Flask
app = Flask(__name__)

# Configura la aplicación
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bdsdcagenda_user:yUzUdvy0Aumag5DxgNPz72HQ4IRbfbN1@dpg-ctdduo0gph6c73es1sfg-a.oregon-postgres.render.com/bdsdcagenda'

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

# Endpoint POST para crear usuario
@app.route('/api/usuario', methods=['POST'])
def crear_usuario():
    data = request.get_json()

    # Validación de datos
    if not data or not data.get('nombre') or not data.get('contrasena'):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    # Crear el usuario
    nuevo_usuario = Usuario(
        nombre=data['nombre'],
        contrasena=data['contrasena']
    )

    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify(nuevo_usuario.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = Usuario.query.all()
    usuarios_serializados = [usuario.serialize() for usuario in usuarios]
    return jsonify(usuarios_serializados), 200

#Endpoint para Clientes
@app.route('/api/cliente', methods=['POST'])
def crear_cliente():
    data = request.json

    if not all(data.get(k) for k in ['nombre', 'apellido', 'cedula', 'direccion', 'telefono']):
        return jsonify({"Error": "faltan datos requeridos"}), 400
    
    nuevo_cliente = Cliente(
        nombre=data['nombre'],
        apellido=data['apellido'],
        cedula=data['cedula'],
        direccion=data['direccion'],
        telefono=data['telefono']
    )

    try:
        db.session.add(nuevo_cliente)
        db.session.commit()
        return jsonify(nuevo_cliente.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/clientes', methods=['GET'])
def obtener_clientes():
    clientes = Cliente.query.all()
    clientes_serializados = [cliente.serialize() for cliente in clientes]
    return jsonify(clientes_serializados), 200

# Endpoint para actualizar un cliente
@app.route('/api/clientes/<int:id>', methods=['PUT'])
def actualizar_cliente(id):
    data = request.json

    # Verifica si los datos requeridos están presentes
    if not data or not any(
        key in data for key in ['nombre', 'apellido', 'cedula', 'direccion', 'telefono']
    ):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    # Busca el cliente por su ID
    cliente = Cliente.query.get(id)
    if not cliente:
        return jsonify({"Error": "Cliente no encontrado"}), 404

    # Actualiza los campos permitidos
    if 'nombre' in data:
        cliente.nombre = data['nombre']
    if 'apellido' in data:
        cliente.apellido = data['apellido']
    if 'cedula' in data:
        cliente.cedula = data['cedula']
    if 'direccion' in data:
        cliente.direccion = data['direccion']
    if 'telefono' in data:
        cliente.telefono = data['telefono']

    try:
        db.session.commit()
        return jsonify(cliente.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

# Endpoint para eliminar un cliente
@app.route('/api/clientes/<int:id>', methods=['DELETE'])
def eliminar_cliente(id):
    # Busca el cliente por su ID
    cliente = Cliente.query.get(id)
    if not cliente:
        return jsonify({"Error": "Cliente no encontrado"}), 404

    try:
        db.session.delete(cliente)
        db.session.commit()
        return jsonify({"Mensaje": "Cliente eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


#Endpoint para estado

@app.route('/api/estados', methods=['GET'])
def obtener_estados():
    estados = Estado.query.all()
    estados_serializados = [estado.serialize() for estado in estados]
    return jsonify(estados_serializados), 200

# Endpoint para actualizar estado
@app.route('/api/estados/<int:id>', methods=['PUT'])
def actualizar_estado(id):
    # Obtiene el estado por su ID
    estado = Estado.query.get(id)
    if not estado:
        return jsonify({"Error": "Estado no encontrado"}), 404

    data = request.get_json()

    # Verifica si los datos requeridos están presentes
    if not data or not data.get('nombre'):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    try:
        # Actualiza el estado
        estado.nombre = data['nombre']
        db.session.commit()
        return jsonify(estado.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# Endpoint para tipo de trabajo
@app.route('/api/tipo_de_trabajos', methods=['GET'])
def obtener_tipos_de_trabajo():
    tipo_de_trabajos = TipoTrabajo.query.all()
    tipo_de_trabajos_serializados = [tipoTrabajo.serialize() for tipoTrabajo in tipo_de_trabajos]
    return jsonify(tipo_de_trabajos_serializados), 200

# Endpoint para actualizar tipo de trabajo
@app.route('/api/tipo_de_trabajos/<int:id>', methods=['PUT'])
def actualizar_tipo_de_trabajo(id):
    # Obtiene el tipo de trabajo por su ID
    tipo_de_trabajo = TipoTrabajo.query.get(id)
    if not tipo_de_trabajo:
        return jsonify({"Error": "Tipo de trabajo no encontrado"}), 404

    data = request.get_json()

    # Verifica si los datos requeridos están presentes
    if not data or not data.get('nombre'):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    try:
        # Actualiza el tipo de trabajo
        tipo_de_trabajo.nombre = data['nombre']
        db.session.commit()
        return jsonify(tipo_de_trabajo.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# Inicializa la aplicación
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Crea las tablas
    app.run(debug=True)



