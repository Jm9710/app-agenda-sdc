import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from admin import setup_admin
from models import db, Usuario, Cliente, Estado, Estado_Contable, TipoTrabajo, Trabajo
from werkzeug.security import check_password_hash

# Inicializa Flask
app = Flask(__name__)
CORS(app)

load_dotenv()
# Configura la aplicación
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bdsdcagenda_user:yUzUdvy0Aumag5DxgNPz72HQ4IRbfbN1@dpg-ctdduo0gph6c73es1sfg-a.oregon-postgres.render.com/bdsdcagenda'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db.init_app(app)
# Inicializa extensiones
migrate = Migrate(app, db)
setup_admin(app)
jwt = JWTManager(app)

# Ruta de prueba
@app.route('/', methods=['GET'])
def saludo():
    return jsonify({"mensaje": "Hola desde Flask"})


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    nombre = data.get('nombre')
    contrasena = data.get('contrasena')

    # Buscar al usuario en la base de datos
    usuario = Usuario.query.filter_by(nombre=nombre).first()

    if usuario and usuario.contrasena == contrasena:  # Comparar contraseñas en texto plano
        # Si la contraseña es correcta, generar el token JWT
        token = create_access_token(identity=usuario.nombre)
        return jsonify({"token": token}), 200

    return jsonify({"error": "Usuario o contraseña incorrectos"}), 401
    
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    # Obtiene la identidad del usuario desde el token JWT
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# Endpoint POST para crear usuario
@app.route('/api/usuario', methods=['POST'])
def crear_usuario():
    data = request.get_json()

    if not data or not data.get('nombre') or not data.get('contrasena'):
        return jsonify({"error": "Faltan datos requeridos"}), 400

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

# Endpoint para Clientes
@app.route('/api/clientes', methods=['POST'])
def crear_cliente():
    data = request.get_json()
    
    if not isinstance(data, dict):
        return jsonify({"Error": "El cuerpo de la solicitud debe ser un JSON válido"}), 400

    if not all(isinstance(data.get(k), str) and data[k].strip() for k in ['nombre', 'apellido', 'direccion', 'telefono']):
        return jsonify({"Error": "Faltan datos requeridos o son inválidos"}), 400


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

        # Emitir evento de actualización de clientes
        clientes_actualizados = [cliente.serialize() for cliente in Cliente.query.all()]


        return jsonify(nuevo_cliente.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/clientes', methods=['GET'])
def obtener_clientes():
    clientes = Cliente.query.all()
    clientes_serializados = [cliente.serialize() for cliente in clientes]
    return jsonify(clientes_serializados), 200

@app.route('/api/clientes/<int:id>', methods=['PUT'])
def actualizar_cliente(id):
    data = request.json

    if not data or not any(
        key in data for key in ['nombre', 'apellido', 'cedula', 'direccion', 'telefono']
    ):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    cliente = Cliente.query.get(id)
    if not cliente:
        return jsonify({"Error": "Cliente no encontrado"}), 404

    for key in data:
        if hasattr(cliente, key):
            setattr(cliente, key, data[key])

    try:
        db.session.commit()
        return jsonify(cliente.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

@app.route('/api/clientes/<int:id>', methods=['DELETE'])
def eliminar_cliente(id):
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

@app.route('/api/estados', methods=['GET'])
def obtener_estados():
    estados = Estado.query.all()
    estados_serializados = [estado.serialize() for estado in estados]
    return jsonify(estados_serializados), 200

@app.route('/api/estados/<int:id>', methods=['PUT'])
def actualizar_estado(id):
    estado = Estado.query.get(id)
    if not estado:
        return jsonify({"Error": "Estado no encontrado"}), 404

    data = request.get_json()

    if not data or not data.get('nombre'):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    try:
        estado.nombre = data['nombre']
        db.session.commit()
        return jsonify(estado.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
    
@app.route('/api/estados_contables', methods=['GET'])
def obtener_estados_contables():
    estados_contables = Estado_Contable.query.all()
    estados_contables_serializados = [estado.serialize() for estado in estados_contables]
    return jsonify(estados_contables_serializados), 200

@app.route('/api/estados_contables/<int:id>', methods=['PUT'])
def actualizar_estado_contable(id):
    estado_contable = Estado_Contable.query.get(id)
    if not estado_contable:
        return jsonify({"Error": "Estado contable no encontrado"}), 404

    data = request.get_json()

    if not data or not data.get('nombre'):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    try:
        estado_contable.nombre = data['nombre']
        db.session.commit()
        return jsonify(estado_contable.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

@app.route('/api/tipo_de_trabajos', methods=['GET'])
def obtener_tipos_de_trabajo():
    tipo_de_trabajos = TipoTrabajo.query.all()
    tipo_de_trabajos_serializados = [tipoTrabajo.serialize() for tipoTrabajo in tipo_de_trabajos]
    return jsonify(tipo_de_trabajos_serializados), 200

@app.route('/api/tipo_de_trabajos/<int:id>', methods=['PUT'])
def actualizar_tipo_de_trabajo(id):
    tipo_de_trabajo = TipoTrabajo.query.get(id)
    if not tipo_de_trabajo:
        return jsonify({"Error": "Tipo de trabajo no encontrado"}), 404

    data = request.get_json()

    if not data or not data.get('nombre'):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    try:
        tipo_de_trabajo.nombre = data['nombre']
        db.session.commit()
        return jsonify(tipo_de_trabajo.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

@app.route('/api/trabajo', methods=['POST'])
def crear_trabajo():
    try:
        data = request.json

        print("Datos recibidos en el backend:", data) 

        campos_requeridos = ['num_trabajo', 'nombre_trabajo', 'cliente_id']
        if not all(data.get(campo) for campo in campos_requeridos):
            return jsonify({"error": "Faltan datos requeridos"}), 400
        
        estado_por_hacer = Estado.query.filter_by(tipo_estado= "Por Hacer").first()
        if not estado_por_hacer:
            return jsonify ({"error": "estado 'por hacer' no encontrado en la BD"})
        
        estado_por_cobrar = Estado_Contable.query.filter_by(tipo_estado_contable= "Por Cobrar").first()
        if not estado_por_cobrar:
            return jsonify ({"error": "estado 'por cobrar' no encontrado en la BD"})


        nuevo_trabajo = Trabajo(
            tipo_de_trabajo=data.get('tipo_de_trabajo'),
            num_trabajo=data.get('num_trabajo'),
            fecha_solicitud=data.get('fecha_solicitud'),
            nombre_trabajo=data.get('nombre_trabajo'),
            manzana=data.get('manzana'),
            solar=data.get('solar'),
            padron=data.get('padron'),
            departamento=data.get('departamento'),
            localidad=data.get('localidad'),
            cliente_id=data.get('cliente_id'),
            telefono_cliente=data.get('telefono_cliente'),
            moneda=data.get('moneda'),
            costo=data.get('costo'),
            iva=data.get('iva', False),
            entrego=data.get('entrego'),
            comentarios=data.get('comentarios'),
            estado=estado_por_hacer.id_estado,
            estado_contable=estado_por_cobrar.id_estado_contable
            
        )

        db.session.add(nuevo_trabajo)
        db.session.commit()

        return jsonify(nuevo_trabajo.serialize()), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error en crear_trabajo: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/trabajos', methods=['GET'])
def obtener_trabajos():
    trabajos = Trabajo.query.all()
    trabajos_serializados = [trabajo.serialize() for trabajo in trabajos]
    return jsonify(trabajos_serializados), 200

@app.route('/api/trabajos/<int:id_trabajo>', methods=['PUT'])
def actualizar_trabajo(id_trabajo):
    data = request.json

    # Verifica si los datos requeridos están en la solicitud
    if not any(
        key in data for key in [
            'nombre_trabajo', 'manzana', 'solar', 'padron', 'departamento',
            'localidad', 'costo', 'iva', 'comentarios', 'estado', 'estado_contable'
        ]
    ):
        return jsonify({"Error": "Faltan datos requeridos"}), 400

    # Buscar el trabajo por id_trabajo
    trabajo = Trabajo.query.get(id_trabajo)
    if not trabajo:
        return jsonify({"Error": "Trabajo no encontrado"}), 404

    # Actualizar los campos del trabajo
    for key in data:
        if hasattr(trabajo, key):
            setattr(trabajo, key, data[key])

    # Verificar si el estado del trabajo es válido
    if 'estado' in data:
        estado_existente = Estado.query.get(data['estado'])
        if not estado_existente:
            return jsonify({"Error": "Estado no válido"}), 400
    
    # Verificar si el estado contable del trabajo es válido
    if 'estado_contable' in data:
        estado_contable_existente = Estado_Contable.query.get(data['estado_contable'])
        if not estado_contable_existente:
            return jsonify({"Error": "Estado contable no válido"}), 400

    # Guardar cambios en la base de datos
    try:
        db.session.commit()
        return jsonify(trabajo.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


@app.route('/api/trabajos/<int:id>', methods=['DELETE'])
def eliminar_trabajo(id):
    trabajo = Trabajo.query.get(id)
    if not trabajo:
        return jsonify({"Error": "Trabajo no encontrado"}), 404

    try:
        db.session.delete(trabajo)
        db.session.commit()
        return jsonify({"Mensaje": "Trabajo eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
    
@app.route('/api/ultimo_numero_trabajo', methods=['GET'])
def obtener_ultimo_numero_trabajo():
    # Consulta el último trabajo registrado por el número de trabajo
    ultimo_trabajo = db.session.query(Trabajo).order_by(Trabajo.num_trabajo.desc()).first()

    # Si existe un trabajo, devuelve el siguiente número
    if ultimo_trabajo:
        siguiente_numero = ultimo_trabajo.num_trabajo + 1
    else:
        siguiente_numero = 9000  # Si no hay trabajos, empieza desde el número 1

    return jsonify({"ultimo_numero": siguiente_numero})


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=3001)